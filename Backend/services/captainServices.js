const captainModel = require('../models/captainModels.js')


module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, typeVehicle, capacity
}) => {
    if (!firstname || !lastname || !email || !password || !color || !plate || !typeVehicle || !capacity) {
        throw new Error('All fields are required')
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            typeVehicle,
            plate,
            capacity
        }

    })

    return captain



}