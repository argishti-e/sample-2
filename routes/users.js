import { Router } from 'express';

import controller from '../controllers/users.controller.js'

import validate from '../middleware/validate.js'
import checkToken from '../middleware/checkToken.js'

import userSchema from '../schemas/users.js'

const router = Router()

// views
router.get('/registration', (req, res) => {
  res.render('registration');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

router.get('/list', (req, res) => {
  res.render('usersList');
});

router.get('/profile/update', (req, res) => {
  res.render('showUpdateUserProfile');
});

// apis
router.post(
  '/registration',
  validate(userSchema.register, 'body'),
  controller.registration
);

router.post(
  '/login',
  validate(userSchema.login, 'body'),
  controller.login,
);

router.get(
  '/list/data',
  checkToken,
  controller.getUsersList,
);

router.get(
  '/profile/data',
  checkToken,
  controller.getUserProfile,
);

router.put(
  '/profile/update',
  checkToken,
  validate(userSchema.updateUserProfile, 'body'),
  controller.updateUserProfile
);

router.delete(
  '/deleteUser/:id',
  checkToken,
  validate(userSchema.deleteUser, 'body'),
  controller.deleteUser,
);

export default router
