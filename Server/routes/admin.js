import express from 'express';
import Post from '../model/post.js';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pagination } from './main.js';

dotenv.config();
const router = express.Router();

const adminLayout = '../views/layouts/admin';
const jwtSecretKey = process.env.JWT_SECRETKEY;

// auth middlwares

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.redirect('/admin');

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(409).json({ message: 'Inavlid Crediantials' });
  }
};
// get Admin page

router.get('/admin', (req, res) => {
  res.render('admin/index', { layout: adminLayout, incorrect: false });
});

//// register for new user Page

router.get('/register', (req, res) => {
  res.render('admin/register', { layout: adminLayout });
});

// Post for Admin check logging in

router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.render('admin/index', {
        layout: adminLayout,
        incorrect: true,
      });
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.render('admin/index', {
        layout: adminLayout,
        incorrect: true,
      });
    const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
      expiresIn: '1h',
    });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 70 * 1000,
      sameSite: 'Strict',
    });
    res.redirect('/dashboard');
  } catch (error) {
    res.send('error');
  }
});

// Post for register new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const user = await User.create({ username, password: hashedPassword });
    res.redirect('/admin');
  } catch (error) {
    if (error.code == 11000) {
      res.status(409).json({ message: 'user already In use' });
    }
    res.status(500).json({ message: 'Internal Server' });
  }
});

router.get('/dashboard', authMiddleware, pagination, async (req, res) => {
  try {
    // const data = await Post.find();
    const { data, nextPage, hasNextPage } = req.pagination;
    res.render('admin/dashboard', {
      data,
      nextPage,
      hasNextPage,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
