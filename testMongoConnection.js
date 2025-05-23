import mongoose from 'mongoose';

const uri = 'mongodb+srv://clairebrady12:TF6BrDENUXLqtPen@student-cluster.u8siv.mongodb.net/less-freezer-tapas?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
