import mongoose from 'mongoose'

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      message: 'A name must not exceed 50 characters.',
      validator: (content) => content.length <= 50
    }
  },

  recipe: {
    type: String,
    required: true,
    validate: {
      message: 'A name must not exceed 250 characters.',
      validator: (content) => content.length <= 250
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

  mealImage: {
    type: String
  }
})



export default mongoose.model('Meal', mealSchema)