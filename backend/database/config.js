import mongoose from 'mongoose';

const DBConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected successfully to ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit the process with failure status
  }
};

// mongoose.connection.on('connected', () => {
//   console.log('Mongoose connected to the database', mongoose.connection.name);
// });

export default DBConnection;
