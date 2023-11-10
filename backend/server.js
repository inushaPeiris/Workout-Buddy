require('dotenv').config()
const express = require("express");
const workoutRoutes = require('./routes/workouts') //getting route file - workouts
const mongoose = require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json()) //express built in method to store request data in json file

app.use((req, res, next) => {  //displays path and method of the incoming requests
    console.log(req.path, req.method)
    next()
})

// route
app.use('/api/workouts', workoutRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // listing for requests
    app.listen(process.env.PORT, () => {
        console.log("connected to the database and listning...!! ", process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

