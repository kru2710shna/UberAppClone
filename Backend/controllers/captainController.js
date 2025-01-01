const captainModel = require('../models/captainModels.js')
const captainService = require('../services/captainServices.js')
const { validationResult } = require('express-validator')


const registerCaptain = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password, vehicle } = req.body

    console.log(req.body)

    const isCaptain = await captainModel.findOne({email})

    if (isCaptain){
        return res.status(400).json({message: 'Captain Already Registered with this email address'})
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        typeVehicle: vehicle.typeVehicle,
        capacity: vehicle.capacity
    })

    const token = captain.generateAuthToken()

    res.status(201).json({ token, captain })

}

const loginCaptain = async(req,res,next) => {

}

const logoutCaptain = async(req,res,next) => {
    
}

const profilecaptain = async(req,res,next) => {
    
}

module.exports = {
    registerCaptain,
    loginCaptain,
    logoutCaptain,
    profilecaptain
};