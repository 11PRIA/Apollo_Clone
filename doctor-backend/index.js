const express = require('express');
const connectDB = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.get('/', (req, res) => {
  res.send('Server is running');
});


app.use('/api/doctors', doctorRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
