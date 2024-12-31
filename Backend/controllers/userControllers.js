// controllers/userControllers.js
const UserModel = require('../models/UserModels.js')
const userServices = require('../services/userServices.js')
const { validationResult } = require('express-validator')

const registerUser = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password } = req.body

    const hashPassword = await UserModel.hashPassword(password)

    const user = await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    })
    const token = user.generateAuthToken()

    res.status(201).json({ token: token, user })

}
module.exports = {
    registerUser,
  };