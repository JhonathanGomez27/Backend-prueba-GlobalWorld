const Type = require('../model/Type');
const { typeValidation } = require('../validation');

const typeController = {};


typeController.getTypes = async (req, res) => {
    const types = await Type.find();
    res.json(types);
}

typeController.addType = async (req, res) => {
     //validating data
     const {error} = typeValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);
 
     //create user
     const type = new Type({
         name: req.body.name
     });

     try{
         const savedType = await type.save();
         res.send({type: type.id});
     }catch(err){
         res.status(400).send(err);
     }
}

module.exports = typeController;