// testMongoConnection.js

import mongoose from 'mongoose';

const uri = 'mongodb+srv://clairebrady12:TF6BrDENUXLqtPen@student-cluster.u8siv.mongodb.net/less-freezer-tapas?retryWrites=true&w=majority&appName=student-cluster';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    mongoose.connection.close(); // Optional: close after test
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB Atlas:', err);
  });
