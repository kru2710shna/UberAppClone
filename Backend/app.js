const express = require('express')
const app = express()
const captainRoutes = require('./routes/captainRoutes.js')

const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const connectToDb = require('./db/db.js')
connectToDb ()

const userRoutes = require('./routes/userRoutes.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

//  Routes
app.get('/', (req, res) => {
    res.send('Hello, world')
})
// User Routes
app.use('/users',userRoutes)

// Cptain Routes
app.use('/captain',captainRoutes)


module.exports = app