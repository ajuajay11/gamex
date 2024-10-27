const mongoose = require('mongoose');

// Define the Match schema
const matchSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Example: "500 Rs Entry Match"
  entryFee: { type: Number, required: true }, // Entry fee to join the match
  prizePool: { type: Number, required: true }, // Total prize pool for the match
  matchtime: { type: Number, required: true }, // Total prize pool for the match
  playerFixturesCount: { type: Number, required: true }, // Total prize pool for the match
  password: { type: String },  // Optional password
  participants: [
    [{ type: mongoose.Schema.Types.Mixed }, { type: mongoose.Schema.Types.Mixed }]
  ],
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;