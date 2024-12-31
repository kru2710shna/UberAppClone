const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, logoutUser, profileUser } = require('../controllers/userControllers.js');
const { authUser } = require('../middlewares/authMiddleware.js');

// User Registration Route
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
        body('fullname.lastname').isLength({ min: 3 }).withMessage('Last Name must be at least 3 characters long'),
    ],
    registerUser
);

// User Login Route
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    ],
    loginUser
);

// User Logout Route
router.post('/logout', authUser,logoutUser);

// User Profile Route
router.get('/profile', authUser, profileUser);

module.exports = router;
