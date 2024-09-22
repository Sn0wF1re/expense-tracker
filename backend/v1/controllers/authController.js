const User = require('../models/user');
const { sendConfirmationEmail, sendPasswordResetEmail } = require('../utils/email');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/auth');
const crypto = require('crypto');

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
  
  const { email, password, firstName, lastName } = req.body;
  const confirmationToken = crypto.randomBytes(32).toString('hex');
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    confirmationToken,
  });

  try {
    await sendConfirmationEmail(user, confirmationToken);
    res.json({ message: 'Signup success! Please login.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong when sending confirmation email' });
  }
};

// confirm user email
const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    confirmationToken: token
  });

  if (!user) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  user.isActive = true;
  user.confirmationToken = null;
  await user.save();

  res.json({ message: 'Email confirmed successfully!' });
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
  
    // check if user has confirmed email
    if (!user.isActive) {
      return res.status(400).json({ error: 'Please confirm your email' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }
  
    const token = generateToken(user);
    res.json({ message: 'Login successful!', accessToken: token, id: user.id, firstName: user.firstName });
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Please include email' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  await user.save();

  try {
    await sendPasswordResetEmail(user, resetToken);
    res.json({ message: 'Password reset email sent!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong when sending password reset email' });
  }
};

// reset user password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Please include new password' });
  }

  const user = await User.findOne({ resetToken: token });

  if (!user) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  user.password = password;
  user.resetToken = null;
  await user.save();

  res.json({ message: 'Password reset successful!' });
};

// logout user
const logout = async (req, res) => {
  try {
    res.json({ accessToken: null, id: null, firstName: null, message: 'Logout successful!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  register,
  login,
  confirmEmail,
  requestPasswordReset,
  resetPassword,
  logout
};
