import mongoose from 'mongoose'

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      message: 'A name must not exceed 50 characters.',
      validator: (content) => content.length <= 50
    }
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId, // This specifies a one-to-many referenced relationship
    ref: 'User', // This refers to the name of the model that this field is related to (user in this case)
   // required: [true, 'Please provide a parent field']
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId, // This specifies a one-to-many referenced relationship
    ref: 'User' // This refers to the name of the model that this field is related to (user in this case)
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId, // This specifies a one-to-many referenced relationship
    ref: 'User' // This refers to the name of the model that this field is related to (user in this case)
  }],
})



export default mongoose.model('Child', childSchema)