const dotenv = require('dotenv');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// connect to mongodb
const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// routes
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/api/expenses', expenseRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
