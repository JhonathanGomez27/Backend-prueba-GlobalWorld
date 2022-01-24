const { corralValidation } = require('../validation');
const Animal = require('../model/Animal');
const Corral = require('../model/Corral');
const Type = require('../model/Type');
const Restriction = require('../model/Restriction');

const corralController = {};

corralController.getCorrales = async (req, res) => {
    const corrales = await Corral.find({}, '-createdAt -updatedAt -__v');
    res.json(corrales);
}

corralController.getAnimalsByCorral = async (req, res) => {
    if(req.body.corral){
        const corral = await Corral.findById(req.body.corral);
        const animals = await Animal.find({_id: {$in: corral.animals}}, '-createdAt -updatedAt -__v');
        const types = await Type.find();

        const animalss = animals.map( animal => { 
            const typeName = types.find(type => type._id.toString() === animal.type.toString());
            return {
                ...animal._doc,
                type: typeName.name,
            }
        });
        try{
            res.json(animalss);
        }catch(err){
            res.status(400).send(err);
        }
    }else{
        res.status(400).send("CorralId is required");
    }
    
}

corralController.getAverageByAge = async (req, res) => {
    if(!req.body.corral) res.status(400).send({alert: "CorralId is required"});
    const corral = await Corral.findById(req.body.corral);

    try{
        const animals = await Animal.find({_id: {$in: corral.animals}});
        if(animals.length > 0){
            const average = animals.reduce((acc, animal) => acc + animal.age, 0) / animals.length;
            res.send({average: average});
        }
        
    }catch(err){
        res.status(400).send("CorralId is required");
    }
}

corralController.addCorral = async (req,res) => {
    //validating data
    const {error} = corralValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //create user
    const corral = new Corral({
        name: req.body.name,
        capacity: req.body.capacity,
        restrictions: req.body.restrictions,
        animals: req.body.animals
    });

    try{
        const savedCorral = await corral.save();
        res.status(200).send({corral: corral.id});
    }catch(err){
        res.status(400).send(err);
    }
}


module.exports = corralController;