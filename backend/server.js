import express from 'express';
import dotenv from 'dotenv';
import DBConnection from './database/config.js'; // add .js extension for user-defined modules

dotenv.config(); // Load environment variables from .env file
const app = express();

app.get('/', (req, res) => {
  res.send('Hi, Hello World!, How are youu doing?');
});

app.listen(3000, () => {
  DBConnection(); // Connect to the database
  console.log('Server is running on port 3000');
});
