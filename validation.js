const joi = require('@hapi/joi');


const validateUser = (data) => {
    const Schema = {
        name:joi.string().min(6).required(),
        email:joi.string().min(6).required(),
        password:joi.string().min(6).required()
    }
    return joi.validate(data, Schema);
}


const loginvalidate = (data) => {
    const Schema = {
        email:joi.string().min(6).required(),
        password:joi.string().min(6).required()
    }
    return joi.validate(data, Schema);
}


module.exports.validateUser = validateUser
module.exports.loginvalidate = loginvalidate