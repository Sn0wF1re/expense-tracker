const User = require('..models/user');
const jwt = require('jsonwebtoken');

// register new user and issue jwt
const register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Please include all fields' });
  };

  const user = await User.create(req.body);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ message: 'Signup success! Please login.', token });
};

// login existing user and issue jwt
const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'Please include email and password' });
  };

  const { email, password } = req.body;

  // check if user exists in db
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ message: 'Login successful!', token });
};

module.exports = {
  register,
  login
};
