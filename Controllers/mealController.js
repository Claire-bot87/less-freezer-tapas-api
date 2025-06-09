import express from 'express'
import { validateToken } from '../middleware/validateToken.js'
import {Meal} from '../models/meal.js'

const router = express.Router()

// * Index route
router.get('/meals', async (req, res, next) => {
  try {
    const meals = await Meal.find()
    return res.json(meals)
  } catch (error) {
    next(error)
  }
})


// * Create route
router.post('/meals', validateToken, async (req, res, next) => {
  try {
    // The req.body is only going to contain the "content" field
    // _id, createdAt, updatedAt will all automatically be generated without us doing anything
    // Likes simply don't need to be passed on creation
    // * Author, however, needs to be created by us inside this controller, post token validation

    req.body.parent = req.user._id
    
    const meal = await Meal.create(req.body)
    return res.status(201).json(meal)
  } catch (error) {
    next(error)
  }
})

// * Show route
router.get('/meals/:mealId', async (req, res, next) => {
  try {
    const { mealId } = req.params

    // 1. Search for the post based on the postId in the params
    const meal = await Meal.findById(mealId).populate('type')

    // 2. Send a 404 if not found
    if(!meal) return res.status(404).json({ message: 'Food Item not found' })

    // 3. Return the post if found
    return res.json(meal)
  } catch (error) {
    next(error)
  }
})



//export { router as mealController }

export default router;