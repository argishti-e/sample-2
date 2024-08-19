import { Router } from 'express';

import controller from '../controllers/posts.controller.js'

import validate from '../middleware/validate.js'
import checkToken from '../middleware/checkToken.js'

import postSchema from '../schemas/posts.js';

const router = Router();

// views
router.get('/createPost', (req, res) => {
  res.render('createPost');
});

router.get('/showGetPosts', (req, res) => {
  res.render('showGetPosts');
});

router.get('/showGetSinglePost', (req, res) => {
  res.render('showGetSinglePost');
});

router.get('/updateUserPost', (req, res) => {
  res.render('showUpdateUserPost');
});

// apis
router.get(
  '/',
  checkToken,
  controller.getPosts,
);

router.get(
  '/single/:id',
  checkToken,
  validate(postSchema.getSinglePost, 'params'),
  controller.getSinglePost,
);

router.post(
  '/create',
  checkToken,
  validate(postSchema.createPost, 'body'),
  controller.createPost,
)

router.put(
  '/update',
  checkToken,
  validate(postSchema.updatePost, 'body'),
  controller.updatePost,
);

router.delete(
  '/delete/:id',
  checkToken,
  validate(postSchema.deletePost, 'params'),
  controller.deletePost,
);

router.get(
  '/search',
  controller.searchPost,
);

export default router
