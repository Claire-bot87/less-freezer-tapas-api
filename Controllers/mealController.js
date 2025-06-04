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

// // * Update route
// router.put('/foodItems/:foodItemId', validateToken, async (req, res, next) => {
//   try {
//     const { foodItemId } = req.params
    
//     // 1. Search for the post based on the postId in the params
//     const foodItem = await FoodItem.findById(foodItemId)

//     // 2. Send a 404 if not found
//     if(!foodItem) return res.status(404).json({ message: 'Food item not found' })

//     // 3. Authorize the logged in user as the author
//     //if (!req.user._id.equals(child.parent)) return res.status(403).json({ message: 'You do not have permssion to access this resource' })

//     // 4. Update the existing post with the req.body
//     const updatedFoodItem = await FoodItem.findByIdAndUpdate(foodItemId, req.body, { returnDocument: 'after' })

//     // 5. Return the updated post to the client
//     return res.json(updatedFoodItem)
//   } catch (error) {
//     next(error)
//   }
// })

// // * Delete route
// router.delete('/foodItems/:foodItemId', validateToken, async (req, res, next) => {
//   try {
//     const { foodItemId } = req.params
    
//     // 1. Search for the post based on the postId in the params
//     const foodItem = await FoodItem.findById(foodItemId)

//     // 2. Send a 404 if not found
//     if(!foodItem) return res.status(404).json({ message: 'FoodItem not found' })

//     // 3. Authorize the logged in user as the author
//     //if (!req.user._id.equals(child.parent)) return res.status(403).json({ message: 'You do not have permssion to access this resource' })

//     // 4. Delete the existing post
//     await FoodItem.findByIdAndDelete(foodItemId)

//     // 5. Return a 204 with no body
//     return res.sendStatus(204)
//   } catch (error) {
//     next(error)
//   }
// })

// * Likes route
// router.put('/feedposts/:postId/likes', validateToken, async (req, res, next) => {
//   try {
//     const { postId } = req.params
    
//     // 1. Search for the post based on the postId in the params
//     const post = await Feedpost.findById(postId)

//     // 2. Send a 404 if not found
//     if(!post) return res.status(404).json({ message: 'Post not found' })

//     // 3. Identify whether user has already liked the post
//     const alreadyLiked = post.likes.includes(req.user._id)

//     // 4. If user has liked the post, remove the ObjectId from the likes array
//     // Else, add the ObjectId to the likes array
//     const updatedPost = await Feedpost.findByIdAndUpdate(postId, {
//       [alreadyLiked ? '$pull' : '$addToSet']: { likes: req.user._id }
//     }, { returnDocument: 'after' })
    
//     return res.json(updatedPost)

//   } catch (error) {
//     next(error)
//   }
// })

export { router as mealController }