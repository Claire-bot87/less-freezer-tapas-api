import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import 'dotenv/config'
import userController from './Controllers/userController.js'
import childController from './Controllers/childController.js'
import foodItemController from './Controllers/foodItemController.js'
import mealController from './Controllers/mealController.js'

const app = express()
const port = process.env.PORT ||3000

// generic middleware
app.use(cors())
app.use(express.json()) //turns responses and requests in to json 
//app.use(mongoSanitize()) // prevents code injection
app.use(morgan('dev')) // generic logger , you can change the 'dev' to other things, check docs



// controllers
app.use('/', userController)
app.use('/', childController)
app.use('/', foodItemController)
app.use('/', mealController)


// error handling middleware

//server conection

const establishServerConnections = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to database')

        app.listen(port, () => console.log('server up and running on ${port} '))
    }catch (error) {
        console.log(error)
    }
}

establishServerConnections()