const express = require('express')
const { ExpressValidator } = require('express-validator')
const router = express.Router()
const { body } = require('express-validator')
const {registerUser,loginUser,logoutUser } = require('../controllers/userControllers.js')

router.post('/register', [
    body('email').isEmail().withMessage('Please enter Valid Email'),
    body('password').isLength({ min: 5 }).withMessage('Please enter Valid Password, atleast 5 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name has to be atleast 3 characters'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last Name has to be at least 3 characters')
], registerUser)

router.post("/login", [
    body('email').isEmail().withMessage('Please enter Valid Email'),
    body('password').isLength({ min: 5 }).withMessage('Please enter Valid Password, atleast 5 characters long'),
], loginUser)


router.post("/logout", logoutUser)

module.exports = router