import express from 'express'
import { validateToken } from '../middleware/validateToken.js'
import {Child} from '../models/child.js'
import {FoodItem} from '../models/foodItem.js'
const router = express.Router()

// * Index route
router.get('/childs', async (req, res, next) => {
  try {
    const childs = await Child.find()
    .populate('parent')
    .populate('likes')
    return res.json(childs)
  } catch (error) {
    next(error)
  }
})


// * Create route
router.post('/childs', validateToken, async (req, res, next) => {
  try {
    // The req.body is only going to contain the "content" field
    // _id, createdAt, updatedAt will all automatically be generated without us doing anything
    // Likes simply don't need to be passed on creation
    // * Author, however, needs to be created by us inside this controller, post token validation

    req.body.parent = req.user._id
    
    const child = await Child.create(req.body)
    return res.status(201).json(child)
  } catch (error) {
    next(error)
  }
})

// * Show route
router.get('/childs/:childId', async (req, res, next) => {
  try {
    const { childId } = req.params

    // 1. Search for the post based on the postId in the params
    const child = await Child.findById(childId)
    .populate('parent')
    .populate('likes')
    .populate('dislikes')
    // 2. Send a 404 if not found
    if(!child) return res.status(404).json({ message: 'Post not found' })

    // 3. Return the post if found
    return res.json(child)
  } catch (error) {
    next(error)
  }
})

// * Update route
router.put('/childs/:childId', validateToken, async (req, res, next) => {
  try {
    const { childId } = req.params
    
    // 1. Search for the post based on the postId in the params
    const child = await Child.findById(childId)

    // 2. Send a 404 if not found
    if(!child) return res.status(404).json({ message: 'Post not found' })

    // 3. Authorize the logged in user as the author
    if (!req.user._id.equals(child.parent)) return res.status(403).json({ message: 'You do not have permssion to access this resource' })

    // 4. Update the existing post with the req.body
    const updatedChild = await Child.findByIdAndUpdate(childId, req.body, { returnDocument: 'after' })

    // 5. Return the updated post to the client
    return res.json(updatedChild)
  } catch (error) {
    next(error)
  }
})

// * Delete route
router.delete('/childs/:childId', validateToken, async (req, res, next) => {
  try {
    const { childId } = req.params
    
    // 1. Search for the post based on the postId in the params
    const child = await Child.findById(childId)

    // 2. Send a 404 if not found
    if(!child) return res.status(404).json({ message: 'Post not found' })

    // 3. Authorize the logged in user as the author
    if (!req.user._id.equals(child.parent)) return res.status(403).json({ message: 'You do not have permssion to access this resource' })

    // 4. Delete the existing post
    await Child.findByIdAndDelete(childId)

    // 5. Return a 204 with no body
    return res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

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


// * Show child's likes
router.get('/childs/:childId/likes', validateToken, async (req, res, next) => {
  try {

      const user = await Child.findById(req.user._id).populate("likes")
      console.log(user)

      if(!user) return res.status(404).json({ message: 'User not found' })
      console.log(child.likes)
      return res.json(child.likes)
  } catch (error) {
      next(error)
  }
})





// * Add foodItem to likes
// router.put('/childs/:childId/likes',  validateToken, async (req, res, next) => {
//   try {
//       const { foodItemId }= req.body
//       // const userId = req.user._id
//       const { childId } = req.params

//       const child = await Child.findById(childId)
//       if(!child) return res.status(404).json({ message: 'Child not found' })
//     //  if(!userId) return res.status(404).json({ message: 'User not found' })

//       const foodItem = await FoodItem.findById(foodItemId)
//       if (!foodItem) return res.status(404).json({ message: 'Food item not found' })

   
//         const updatedChild = await Child.findByIdAndUpdate(
//           childId,
//           { $addToSet: { likes: foodItemId } },
//           { new: true }
//         ).populate('likes')

//       return res.json(updatedChild)
//   } catch (error) {
//       next(error)
//   }
// })



// PUT /childs/:childId/likes
router.put('/childs/:childId/likes', 
  //validateToken,
   async (req, res, next) => {
  try {
      const { childId } = req.params;
      const { foodItemId } = req.body;

      const child = await Child.findById(childId);
      if (!child) return res.status(404).json({ message: 'Child not found' });

      if (!foodItemId) return res.status(400).json({ message: 'Food item ID is required' });

      // Avoid duplicates
      if (!child.likes.includes(foodItemId)) {
        child.likes.push(foodItemId);
        await child.save();
      }

      const updatedChild = await Child.findById(childId).populate('likes');
      return res.json(updatedChild);
  } catch (error) {
      next(error);
  }
});


// PUT /childs/:childId/dislikes
router.put('/childs/:childId/dislikes', 
  //validateToken,
   async (req, res, next) => {
  try {
      const { childId } = req.params;
      const { foodItemId } = req.body;

      const child = await Child.findById(childId);
      if (!child) return res.status(404).json({ message: 'Child not found' });

      if (!foodItemId) return res.status(400).json({ message: 'Food item ID is required' });

      // Avoid duplicates
      if (!child.dislikes.includes(foodItemId)) {
        child.dislikes.push(foodItemId);
        await child.save();
      }

      const updatedChild = await Child.findById(childId).populate('dislikes');
      return res.json(updatedChild);
  } catch (error) {
      next(error);
  }
});

export {router as childController}