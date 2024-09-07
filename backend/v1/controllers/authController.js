const User = require('../models/user');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');

// register new user and issue jwt
const register = async (req, res) => {
  const schema = z.object({
    firstName: z.string().min(2).max(50).nonempty(),
    lastName: z.string().min(2).max(50).nonempty(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  if (!req.body) {
    return res.status(400).json({ error: 'Please include all fields' });
  };

  try {
    schema.parse(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }
  
  const user = await User.create(req.body);
  res.json({ message: 'Signup success! Please login.' });
};

// login existing user and issue jwt
const login = async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'Please include email and password' });
  };

  try {
    schema.parse(req.body);
  } catch (err) {
    return res.status(400).json({ error: err.errors });
  }


  const { email, password } = req.body;

  try {
    // check if user exists in db
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }
  
    const token = generateToken(user);
    res.json({ message: 'Login successful!', accessToken: token, id: user.id, email: user.email });
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const logout = async (req, res) => {
  try {
    res.json({ accessToken: null, id: null, email: null, message: 'Logout successful!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  register,
  login,
  logout
};
