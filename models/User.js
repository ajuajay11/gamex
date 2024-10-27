const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add this import

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number },
  role: { type: String, enum: ['player', 'admin'], default: 'player' }, // Role field
  wallet: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'user' });

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

const User = mongoose.model('User', userSchema);
module.exports = User;