//validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema =  Joi.object({
        name: Joi.string().required().max(255).min(6),
        email: Joi.string().required().email().min(6),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema =  Joi.object({
        email: Joi.string().required().email().min(6),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data);
};

const animalValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        weight: Joi.number().required(),
        corral: Joi.required(),
        type: Joi.required()
    });

    return schema.validate(data);
};

const corralValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        capacity: Joi.number().required(),
        restrictions: Joi.required(),
        animals: Joi.array()
    });

    return schema.validate(data);
};

const typeValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(data);
};

const restrictionValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        types: Joi.array().required()
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.animalValidation = animalValidation;
module.exports.corralValidation = corralValidation;
module.exports.typeValidation = typeValidation;
module.exports.restrictionValidation = restrictionValidation;