const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({

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
        minLength: [5, " Email has to be atleast 5 characters long"]

    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }

}, { timestamps: true })

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn:'24h'})
    return token
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  };

const userModel = mongoose.model('User', UserSchema)

module.exports = userModel 