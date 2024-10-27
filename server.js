const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser'); // Import body-parser if you still want to use it
const walletRoute = require('./router/walletRoute'); // Import wallet route
const authVerification = require('./router/authVerification'); // Import auth verification route
const createMatchRoutes = require('./router/createMatch'); // Import create match routes

dotenv.config();
const User = require('./models/User'); // Ensure this path is correct

const app = express(); // Initialize express app
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });

// Fetch all users from MongoDB
app.get('/api/users', async (req, res) => {
  try {
    console.log('Attempting to fetch all users...');
    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    // Create an object with a "users" property containing the array
    const response = {
      users: users.map(user => ({
        _id: user._id,
        name: user.name,
        age: user.age,
        id: user.id, // Include this if it exists in your schema
        // Add any other fields you want to include
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

// Use the wallet route
app.use('/api/wallet', walletRoute);

// Use authentication verification routes
app.use('/api', authVerification);

// Use create match routes
app.use('/api', createMatchRoutes); // Use createMatch routes under /api
