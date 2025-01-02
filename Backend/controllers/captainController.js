const CaptainModel = require('../models/CaptainModel.js')
const captainService = require('../services/captainServices.js')
const { validationResult } = require('express-validator')
const blacklistModel  = require('../models/blacklistTokenModels.js')

const registerCaptain = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password, vehicle } = req.body

    console.log(req.body)

    const isCaptain = await CaptainModel.findOne({ email })

    if (isCaptain) {
        return res.status(400).json({ message: `Captain with email ${email} is already registered.` })
    }

    const hashedPassword = await CaptainModel.hashPassword(password)
    console.log('Hashed Password:', hashedPassword);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        typeVehicle: vehicle.typeVehicle,
        capacity: vehicle.capacity
    })

    const token = captain.generateAuthToken()

    res.status(201).json({ token, captain })

}

const loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        console.log('Login Email:', email);
        console.log('Login Password:', password);

        const captain = await CaptainModel.findOne({ email }).select('+password');
        if (!captain) {
            console.log('Captain not found');
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        console.log('Stored Hashed Password:', captain.password);

        const isMatch = await captain.comparePassword(password);
        console.log('Password Match Result:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const token = captain.generateAuthToken();
        return res.status(200).json({
            message: 'Authentication Successful',
            token,
            user: {
                id: captain._id,
                email: captain.email,
                name: `${captain.fullname.firstname} ${captain.fullname.lastname}`,
            },
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Server Error' });
    }
};

const logoutCaptain = async (req, res, next) => {
    try {
        // Retrieve token from cookies or headers
        const token =
            (req.cookies && req.cookies.token) ||
            (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: 'No token provided for logout.' });
        }

        console.log('Token to blacklist:', token);

        // Store token in blacklist database
        await blacklistModel.create({ token });

        // Clear the token from cookies
        res.clearCookie('token');

        return res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
        console.error('Logout error:', error.message);
        return res.status(500).json({ message: 'Server error during logout.' });
    }
};;


const profilecaptain = async (req, res, next) => {

    res.status(200).json({ message: "Profile Displayed" })

}

module.exports = {
    registerCaptain,
    loginCaptain,
    logoutCaptain,
    profilecaptain
};