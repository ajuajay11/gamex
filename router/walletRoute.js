const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Adjust the path as needed
const { userAuth } = require('../middleware'); // Import userAuth properly

// Get wallet balance for a specific user
router.get('/:userId',userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ wallet: user.wallet });
  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).json({ error: 'Failed to fetch wallet', details: error.message });
  }
});

router.put('/:userId', userAuth, async (req, res)=> {
  try{
    const { userId } = req.params;
    const {amount}= req.body;
    // Check if user exists
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { wallet: amount } }, // Increment wallet by the given amount
      { new: true, runValidators: false } // Return updated user, skip validators
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(
      { message: 'Wallet updated successfully', 
        wallet: updatedUser.wallet }
    );
  }
  catch{
    console.error('Error updating wallet:', error);
    res.status(500).json({ error: 'Failed to update wallet', details: error.message });
  }
});

module.exports = router;
