const dotenv = require('dotenv');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { verifyToken } = require('./middleware/auth');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect to mongodb
const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// routes
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const secret = process.env.JWT_SECRET;

app.use('/api/v1/expenses', verifyToken, expenseRoutes);
app.use('/api/v1/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
