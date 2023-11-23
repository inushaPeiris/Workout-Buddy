const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a selected workout
const getWorkout = async (req, res) => {
    const {id} = req.params 

    //check id type
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such a workout"})
    }

    const workout = await Workout.findById(id)

    //check id availability
    if (!workout){
        return res.status(404).json({error: "No such a workout"})
    }

    res.status(200).json(workout)
}

// post a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} =  req.body

    // add doc to db
    try {
        // pause the function untill database operation is done
        const workout = await Workout.create({title, reps, load}) 
        res.status(200).json(workout)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})//_id = mongoDB keyword for object id 

    if(!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body // avoid directly modifying the req.body
    })
  
    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}