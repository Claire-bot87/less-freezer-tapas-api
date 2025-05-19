import mongoose from 'mongoose'
import foodItems from '../data/food.js'
import FoodItem from '../models/foodItem.js'

async function seed(){
mongoose.connect('mongodb://127.0.0.1:27017/less-freezer-tapas-api')

await FoodItem.deleteMany()

const newFoodItems = await FoodItem.create(foodItems)

await mongoose.disconnect()
}

seed()