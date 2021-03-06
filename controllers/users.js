const bcrypt = require('bcryptjs');

const User = require('../models/user');
const validateEmail = require('../utils/validate-email');
const defineUserSearchQuery = require('../utils/define-user-search-query');

exports.createUser = async (req, res, next) => {
  try {
    if (req.body.admin && !req.user.admin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (!req.body.name) {
      return res
        .status(400)
        .json({ error: 'Please enter a name for the user' });
    }

    if (!req.body.email || !validateEmail(req.body.email.trim())) {
      return res
        .status(400)
        .json({ error: 'Please enter a valid email for the user' });
    }

    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    if (!req.body.password || req.body.password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Please enter a six or more characters long password' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
    res.status(200).json({ token: user.generateToken() });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    if (!req.body.email || !validateEmail(req.body.email.trim())) {
      return res.status(400).json({ error: 'Please enter the user email' });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: 'Wrong Credentials' });
    }

    const compare = await bcrypt.compare(
      req.body.password || '',
      user.password
    );

    if (!compare) {
      return res.status(400).json({ error: 'Wrong Credentials' });
    }

    res.status(200).json({ token: user.generateToken() });
  } catch (err) {
    next(err);
  }
};

exports.readUsers = async (req, res, next) => {
  try {
    const searchQuery = defineUserSearchQuery(req);
    const users = await User.find(searchQuery)
      .select('-password')
      .sort('email');
    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
};

exports.readUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    if (req.body.admin && !req.user.admin) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({
          error: 'Please enter a six or more characters long password',
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.set({ ...req.body, password: hashedPassword }).save();
    } else {
      user.set(req.body).save();
    }

    res.status(200).json({ token: user.generateToken() });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const deleted = await user.remove();
    res.status(200).json({ data: deleted });
  } catch (err) {
    next(err);
  }
};

exports.changeOwnPassword = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id.toString()) {
      return res
        .status(400)
        .json({ error: 'Users can change their own password only' });
    }

    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({
          error: 'Please enter a six or more characters long password',
        });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.set({ password: hashedPassword }).save();
    }

    res.status(200).json({ msg: 'Password changed' });
  } catch (err) {
    next(err);
  }
};