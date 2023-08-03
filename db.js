const mongoose = require("mongoose");

const express = require("express");



const app = express();


app.use(express.json());

const URL = 'mongodb://127.0.0.1:27017/LearningMongo';


const connectDB = async () => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected');
  } catch (error) {
    console.error('Error Not Connected:', error);
    process.exit(0); 
  }
  
  return app;
};

module.exports = connectDB; 
