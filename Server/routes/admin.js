import express from 'express';
import Post from '../model/post.js';

const adminLayout = '../views/layouts/admin';

const router = express.Router();

router.get('/admin', (req, res) => {
  res.render('admin/index', { layout: adminLayout });
});

export default router;
