const express = require('express');
const router = express.Router()
const { body } = require('express-validator');
const {registerCaptain} = require('../controllers/captainController.js')

router.post('/register',[
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long'),
        body('fullname.lastname').isLength({ min: 3 }).withMessage('Last Name must be at least 3 characters long'),
        body('vehicle.color').isLength({ min: 3 }).withMessage('Colour must be at least 3 characters long'),
        body('vehicle.capacity'),
        body('vehicle.typeVehicle').isIn( ['car','bike','auto'] ).withMessage('Vehicle Type is from 3 different orders'),
        body('vehicle.plate').isLength({ min: 3 }).withMessage('plate has to be atleast 3 letters long')
 
], registerCaptain)

module.exports =  router  