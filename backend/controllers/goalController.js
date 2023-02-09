const asyncHandler = require('express-async-handler')

//@des Get Goals
//@route Get /api/goals
//@access Private

const getGoals =asyncHandler(async (req, res)=>{
    res.status(200).json({message:'Get goals'});
})


//@des delete Goal
//@route delete /api/goals/:id
//@access Private

const deleteGoal = asyncHandler(async (req, res)=>{
    res.status(200).json({mesage:`deleted the goal ${req.params.id}`})
})

//@des create Goal
//@route post /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw  new Error("please enter a text")
    }
    res.status(200).json({message:`Create Goal ${req.body.text}`});
})
//@des update Goal
//@route update /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res)=>{
    res.status(200).json({message:`update goal ${req.params.id}`});
})



module.exports = {
    getGoals,
    deleteGoal,
    setGoal,
    updateGoal,
}