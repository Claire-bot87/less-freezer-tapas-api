import mongoose from 'mongoose';

const handler = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas from Netlify Function');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Connected to MongoDB Atlas' }),
    };
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Connection failed', error: error.message }),
    };
  }
};

export { handler };