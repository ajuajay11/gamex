const express = require('express');
const router = express.Router();
const {adminAuth, userAuth} = require('../middleware');
 const Match = require('../models/Match');
const User = require('../models/User'); // Ensure you have the User model imported

// Function to generate a random 8-character alphanumeric string
const generateMatchId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let matchId = '';
  for (let i = 0; i < 8; i++) {
    matchId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return matchId;
};

router.post('/create-match',adminAuth, async (req, res) => {
  try {
    const { title, entryFee, prizePool, matchtime, playerFixturesCount, password } = req.body;
    // Ensure all required fields are present
    if (!title || !entryFee || !prizePool || !matchtime || !playerFixturesCount) {
      return res.status(400).json({ error: 'All fields are required' });
    }
// Generate a unique match ID
    let matchId = generateMatchId();
    // Ensure the match ID is unique
    while (await Match.findOne({ matchId })) {
      matchId = generateMatchId(); // Regenerate if not unique
    }
    // Create a new match
    const newMatch = new Match({
      title,
      entryFee,
      prizePool,
      matchtime,
      playerFixturesCount,
      password: password || null, 
    });

    await newMatch.save();
    res.status(201).json({ message: 'Match created successfully',matchId: newMatch._id, match: newMatch });
  } catch (error) {
    console.error('Match creation error:', error);
    res.status(500).json({ error: 'Failed to create match', details: error.message });
  }
});


router.post('/join-match', userAuth, async (req, res) => {
  try {
    const { matchId, password } = req.body;
    const userId = req.user._id;

    // Find the match
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ error: 'Match not found' });
    if (match.password && match.password !== password) return res.status(401).json({ error: 'Incorrect password' });

        // Flatten participants array to count current participants
        const currentParticipants = match.participants.flat();
        const participantCount = currentParticipants.length;

// Check if the user is already a participant
    if (currentParticipants.some((participant) => participant.id === userId.toString())) {
      return res.status(400).json({ error: 'User already joined the match' });
    }

    // Check if the participant count has reached the maximum allowed
    if (participantCount >= match.playerFixturesCount) {
      return res.status(400).json({ error: 'Match is full, cannot join' });
    }

    // Retrieve user details
    const user = await User.findById(userId);
    const userDetails = {
      id: user._id,
      name: user.name,
      email: user.email,
      wallet: user.wallet,
    };

    // Add user to match in pairs
    if (match.participants.length === 0 || match.participants[match.participants.length - 1].length === 2) {
      // Start a new pair if no pairs exist or last pair is full
      match.participants.push([userDetails]);
    } else {
      // Complete the current pair
      match.participants[match.participants.length - 1].push(userDetails);
    }

    await match.save();

    res.status(200).json({
      message: 'Successfully joined the match',
      match,
    });
  } catch (error) {
    console.error('Error joining match:', error);
    res.status(500).json({ error: 'Failed to join match', details: error.message });
  }
});


router.get('/get-match/:matchId', async (req, res) => {
  try {
    const { matchId } = req.params;

    // Find the match by its ID
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Optional: Check if the user is a participant if req.user is defined
    if (req.user && match.participants.includes(req.user._id)) {
      return res.status(400).json({ error: 'User already joined the match' });
    }

    // Send back the match details
    res.status(200).json({
      match,
      matchId:match._id,
    });
  } catch (error) {
    console.error('Error fetching match:', error);
    res.status(500).json({ error: 'Failed to fetch match', details: error.message });
  }
});



module.exports = router;