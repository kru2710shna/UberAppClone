const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

const captainSchema = mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, "First Name has to be atleast 3 characters long"]
        },
        lastname: {
            type: String,
            minLength: [3, " Last Name has to be atleast 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please Enter Valid Email Address']
    },
    password: {
        type: String,
            required: true,
            minLength: [5, "Passwordhas to be atleast 5  characters long"]

    },
    socketId : {
        type: String, 
    },
    captainstatus : {
        type: String,
        enum: ['active','inactive'],
        default : 'active'
    },
    vehicle : {
        color : {
            type: String,
            required: true,
            minLength: [3, 'Color has to be atleast 3 letters ']
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, 'plate has to be atleast 3 letters long']
        },
        capacity : {
            type:String,
            required: true
        },
        typeVehicle : {
            type: String,
            required: true,
            enum: ['car','bike','auto']
        }
    }


})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn:'24h'})
    return token
}

captainSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  };

const captainModel = mongoose.model('Captain', captainSchema)

module.exports = captainModel