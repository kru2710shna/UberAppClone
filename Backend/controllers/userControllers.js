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

const loginUser = async (req, res, next) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password); // Assuming comparePassword is an instance method
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        // Generate authentication token
        const token = user.generateAuthToken(); // Assuming generateAuthToken is defined on the user schema

        // Send response
        return res.status(200).json({
            message: 'Authentication Successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name, // Include user details as needed
            },
        });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = loginUser;


const logoutUser = async (req, res, next) => {

}
module.exports = {
    registerUser,
    logoutUser,
    loginUser
};