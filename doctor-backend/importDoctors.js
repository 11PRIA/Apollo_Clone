// importDoctors.js
const mongoose = require('mongoose');
const fs       = require('fs');
const Doctor   = require('./models/Doctor');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('🗄️  Connected to MongoDB');

  const data = JSON.parse(fs.readFileSync('doctors.json', 'utf8'));
  await Doctor.insertMany(data);
  console.log(`✅ Inserted ${data.length} doctors`);

  process.exit();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
