const asyncHandler = require('express-async-handler')

// this has a baunch of mongoose method to do all sort of things on database
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
//@des Get Goals
//@route Get /api/goals
//@access Private

const getGoals =asyncHandler(async (req, res)=>{
    const goals = await Goal.find({user:req.user.id});

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
        text:req.body.text,
        user:req.user.id
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
    
    } 
     
    const user= await User.findById(req.user.id);
    //check for user
    if(!user){
        res.status(401)
        throw Error("User found")
    }

    //make sure the logged in user matches the goal user
     if(goal.user.toString()!== user.id){
        res.status(401)
        throw Error('User not autorized')
     }

        await goal.remove()
        res.status(200).json({id:req.params.id});
       
  });
  
//@des update Goal
//@route update /api/goals/:id
//@access Private

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    if (!goal) {
        res.status(400)
        throw new Error('Goal not  found');      
    } 
  
    const user= await User.findById(req.user.id);
    //check for user
    if(!user){
        res.status(401)
        throw Error("User found")
    }

    //make sure the logged in user matches the goal user
     if(goal.user.toString()!== user.id){
        res.status(401)
        throw Error('User not autorized')
     }

    const  updatedGoal = await Goal.findByIdAndUpdate(req.params.id,
           req.body, { new: true
             })
        res.status(200).json(updatedGoal);
  });
  

module.exports = {
    getGoals,
    deleteGoal,
    setGoal,
    updateGoal,
}