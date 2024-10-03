const dotenv = require('dotenv');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { verifyToken } = require('./middleware/auth');

dotenv.config();

const app = express();

// CORS configuration
// const corsOptions = {
//   origin: true
// };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


// connect to mongodb
const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to MongoDB');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// routes
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/v1/budgets', verifyToken, budgetRoutes);
app.use('/api/v1/categories', verifyToken, categoryRoutes);
app.use('/api/v1/expenses', verifyToken, expenseRoutes);
app.use('/api/v1/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
