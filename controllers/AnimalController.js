const { animalValidation} = require('../validation');
const Animal = require('../model/Animal');
const Corral = require('../model/Corral');
const Type = require('../model/Type');
const Restriction = require('../model/Restriction');

const animalController = {};

animalController.addAnimal = async (req, res) => {
    //validating data
    const {error} = animalValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //create user
    const animal = new Animal({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        corral: req.body.corral,
        type: req.body.type
    });

    const corral = await Corral.findById(req.body.corral, '-createdAt -updatedAt -__v');
    const typesRestriction = await Restriction.findById(corral.restrictions, '-createdAt -updatedAt -__v');


    try{
        if(isTypeInRestriction(typesRestriction.types, req.body.type)){
            if(corral.animals.length < corral.capacity){
                const savedAnimal = await animal.save();
                corral.animals.push(animal._id);
                corral.save();
                res.send({animal: animal._id});
            }else{
                res.status(400).send({alert: "The corral does not admit more animals"});
            }
        }
        else{
            res.status(400).send({alert: "The animal does not meet the requirementes of the corral"});
        }
    }catch(err){
        res.status(400).send(err);
    }
}

function isTypeInRestriction(restricions, type){
    for(var i=0; i < restricions.length; i++){
        if(restricions[i] == type){
            return true;
        }
    }

    return false;
}

animalController.getAllAnimals = async (req, res) => {
    const animals = await Animal.find({}, '-createdAt -updatedAt -__v').sort({corral: -1});
    const types = await Type.find();
    const corrals = await Corral.find();

    const animalss = animals.map( animal => { 
        const typeName = types.find(type => type._id.toString() === animal.type.toString());
        const corralName = corrals.find(corral => corral._id.toString() === animal.corral.toString())
        return {
            ...animal._doc,
            type: typeName.name,
            corral: corralName.name
        }
    });

    try{
        res.json(animalss);
    }catch(err){
        res.status(400).send(err);
    }
}

module.exports = animalController;