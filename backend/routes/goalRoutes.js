const express = require('express');
const router = express.Router();
const {getGoals,
      deleteGoal, 
      setGoal, 
      updateGoal} = require('../controllers/goalController');


router.route('/').get(getGoals).post(setGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal)


module.exports= router;