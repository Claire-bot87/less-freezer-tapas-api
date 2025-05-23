import express from 'express'
import serverless from 'serverless-http'
import mongoose from 'mongoose'
import morgan from 'morgan'
// import errorHandler from "../../middleware/errorHandler.js"
// import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import 'dotenv/config'

import { userController } from '../../Controllers/userController.js'
import { childController } from '../../Controllers/childController.js'
import { foodItemController } from '../../Controllers/foodItemController.js'
import { mealController } from '../../Controllers/mealController.js'

const app = express()

// generic middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get("/", (req, res) => {
  res.send("welcome")
})
app.get('/test-signup-route', (req, res) => {
    const routes = app._router.stack
      .filter(r => r.route)
      .map(r => r.route.path);
    res.json({ loadedRoutes: routes });
  });

// controllers
app.use('/', userController)
app.use('/', childController)
app.use('/', foodItemController)
app.use('/', mealController)

// database connection logic
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    throw err;
  }
};

const serverlessHandler = serverless(app);
// export wrapped handler
export const handler = async (event, context) => {
  await connectToDatabase(); // Ensures connection is made (only once per cold start)

  return serverlessHandler(event, context);
};
