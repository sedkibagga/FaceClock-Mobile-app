const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes'); // User routes
const recognitionRoute = require('../backend/Routes/recognitionRoutes'); // Recognition routes

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection URIs
const userDBURI = "your mongo uri";
const recognitionDBURI = "your mongo uri";

// Create a new Mongoose connection for the user database
mongoose.connect(userDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to User MongoDB');

  // Create a new Mongoose connection for the recognition database
  return mongoose.createConnection(recognitionDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
})
.then((recognitionDBConnection) => {
  console.log('Connected to Recognition MongoDB');

  // Routes setup after successful database connections
  app.use("/api/users", userRoute); // User routes
  app.use("/api/recognition", recognitionRoute); // Recognition routes

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
