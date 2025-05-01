const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  location: String,
  rating: Number,
  fees: Number, // New
  modeOfConsult: [String], // New (e.g., ['Online', 'In-clinic'])
  languages: [String], // Add this if your backend saves languages as an array
  facilities: [String], // Add this if your backend saves facilities as an array
});

module.exports = mongoose.model('Doctor', doctorSchema);