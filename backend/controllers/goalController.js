const asyncHandler = require('express-async-handler')

// this has a baunch of mongoose method to do all sort of things on database
const Goal = require('../models/goalModel')

//@des Get Goals
//@route Get /api/goals
//@access Private

const getGoals =asyncHandler(async (req, res)=>{
    const goals = await Goal.find(/*{ createdAt: 1, updatedAt: 1 }*/)

    res.status(200).json(goals);
})

//@des create Goal
//@route post /api/goals
//@access Private

const setGoal = asyncHandler(async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw  new Error("please enter a text")
    }
    const goal = await Goal.create({
        text:req.body.text
    })
    res.status(200).json(goal);
})

//@des delete Goal
//@route delete /api/goals/:id
//@access Private

const deleteGoal = asyncHandler(async (req, res) => {
    let goal = await Goal.findById(req.params.id);
  
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found');
    
    } else{
        await goal.remove()
        res.status(200).json({id:req.params.id})   
    }   
  });
  
//@des update Goal
//@route update /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    
    if (!goal) {
        res.status(400)
        throw new Error('Goal not  found');      
    } 
    const  updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
           body, { new: true
             })
        res.status(200).json(updatedGoal);
  });
  

module.exports = {
    getGoals,
    deleteGoal,
    setGoal,
    updateGoal,
}