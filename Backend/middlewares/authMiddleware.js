const UserModel = require('../models/UserModels.js');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklistTokenModels.js');
const CaptainModel = require('../models/CaptainModel.js')


const authUser = async (req, res, next) => {
    const token =
        (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const isBlackListed = await blacklistModel.findOne({ token });

        if (isBlackListed) {
            return res.status(403).json({ message: 'Token has been blacklisted. Please log in again.' });
        }

        console.log("isBlackListed", isBlackListed)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authorization error:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


const authCaptain = async (req, res, next) => {
    const token =
        (req.cookies && req.cookies.token) || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const isBlackListed = await blacklistModel.findOne({ token });
        console.log('Blacklist Check Result:', isBlackListed);

        if (isBlackListed) {
            return res.status(403).json({ message: 'Token has been blacklisted. Please log in again.' });
        }

        console.log("isBlackListed", isBlackListed)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        const captain = await CaptainModel.findById(decoded._id);
        console.log('Captain Found:', captain);

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.captain = captain;
        next();
    } catch (error) {
        console.error('Authorization error:', error.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    authUser,
    authCaptain
};
