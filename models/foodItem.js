import mongoose from 'mongoose'

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      message: 'A name must not exceed 50 characters.',
      validator: (content) => content.length <= 50
    }
  },
  type: {
    type: String,
    required: true,
    validate: {
      message: 'A name must not exceed 50 characters.',
      validator: (content) => content.length <= 50
    }
  },
  
  foodImage: {
    type: String
  }
})



const FoodItem =  mongoose.model('FoodItem', foodItemSchema)
export {FoodItem}