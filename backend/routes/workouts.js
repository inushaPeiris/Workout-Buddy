const express = require('express')
const workoutModel = require('../models/workoutModel')
const router = express.Router() //using "router" instead of "app" here
const Workout = require('../models/workoutModel')
const {
    createWorkout,
    getWorkouts,
    getWorkout
} = require('../controllers/workoutController')

// get all workouts
router.get('/', getWorkouts)

// get a selected workout
router.get('/:id', getWorkout)

// post a new workout
router.post('/', createWorkout)

// delete a workout
router.delete('/:id', (req, res) => {
    res.json({message: "DELETE a workout"})
})

// update workout
router.patch('/:id', (req, res) => {
    res.json({message: "UPDATE a workot"})
})

module.exports = router