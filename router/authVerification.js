const express = require('express');
const User = require('../models/User');  // Adjust the path as needed
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
      const { email, password, role, wallet } = req.body;
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      // Compare the provided password with the hashed password in the DB
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
      // Generate a JWT token
      const token = user.generateAuthToken();
      // Send the token and user info as a response
      res.status(200).json({
        message: 'Login successful',
        userId: user._id,
        name: user.name,
        email: user.email,
        token,
        role:user.role,
        wallet: user.wallet
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Login failed', details: error.message });
    }
  });
  

// Registration Route
router.post('/register', async (req, res) => {
    try {
      const { email, password, age, lastname, firstname, role} = req.body;
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      // Create and save the new user
      const newUser = new User({ email, password, age, lastname, firstname,role, wallet:0 });
      await newUser.save();
      // Generate JWT token for the new user
      const token = newUser.generateAuthToken();
      // Send the token along with the user ID
      res.status(201).json({ 
        message: 'User registered successfully', 
        userId: newUser._id, 
        firstname:newUser.lastname, 
        lastname:newUser.lastname,  
        role,
        wallet: newUser.wallet,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed', details: error.message });
    }
});  

router.post('/subscribe/:userId', async (req, res) => {
    try {
        const { money } = req.body;
        const { userId } = req.params; // Use params for userId

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if the user already has the admin role
        if (user.role === 'admin') {
            return res.status(400).json({ error: 'You are already an admin' });
        }
        // Check if the user has enough wallet balance
        if (user.wallet < money) {
            return res.status(400).json({ error: 'Insufficient wallet balance' });
        }

        // Deduct 100 Rs as a subscription fee and assign admin role
        user.wallet -= 100;
        user.role = 'admin';

        // Save the updated user details
        await user.save();

        res.status(200).json({ message: 'Subscription successful, user is now an admin', user });
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({ error: 'Subscription failed', details: error.message });
    }
});

module.exports = router;
