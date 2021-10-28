const express = require('express');
const Validator = require('validatorjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { UserModel: User } = require('../models/user');
const kebab = require('../utils/kebab');

// Create an account
router.post('/register', async (req, res) => {
  const validation = new Validator(req.body, {
    email: 'required|email',
    fullname: 'required',
    password: 'required|min:8',
  });

  if (!validation.passes()) {
    const { errors } = validation.errors;
    return res.status(400).json({
      errors,
    });
  }

  const {
    email,
    fullname,
    password,
  } = req.body;

  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    return res.status(400).json({
      message: 'This email is already registered',
    });
  }

  // Hashing Password
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    username: kebab(fullname),
    email,
    fullname,
    password: hashedPassword,
    user_type: 'customer',
  });

  await user.save();
  return res.status(201).json({
    message: 'Account created successfuly',
  });
});

// Login
router.post('/login', async (req, res) => {
  const validation = new Validator(req.body, {
    email: 'required|email',
    password: 'required',
  });

  if (!validation.passes()) {
    const { errors } = validation.errors;
    return res.status(400).json({
      errors,
    });
  }

  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  // Generate a valid access token
  const token = jwt.sign({
    iss: 'Babali Shop S.A de C.V',
    id: user._id,
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Refresh Tokens
  // You can add logic for create the refresh token

  return res.json({
    jwt: token,
  });
});

module.exports = router;