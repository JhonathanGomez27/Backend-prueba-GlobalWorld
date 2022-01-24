const Restriction = require('../model/Restriction');
const { restrictionValidation } = require('../validation');

const restrictionController = {};

restrictionController.getRestrictions = async (req, res) => {
    const restrictions = await Restriction.find();
    res.json(restrictions);
}

restrictionController.addRestrictions = async (req, res) => {
     //validating data
     const {error} = restrictionValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);
 
     //create user
     const restriction = new Restriction({
         name: req.body.name,
         types: req.body.types
     });

     try{
         const savedRestriction = await restriction.save();
         res.send({restriction: restriction.id});
     }catch(err){
         res.status(400).send(err);
     }
}

module.exports = restrictionController;