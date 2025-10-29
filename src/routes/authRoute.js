import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authentication.js';
import { authorize } from '../middlewares/authorization.js';
import generateRandomPassword from '../utils/password_generator.js';
import bcrypt from 'bcrypt';
import sendMail from '../controllers/emailController.js';

const router = express.Router();

// Signup for normal users
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await signup(username, email, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Admin creates another admin
router.post('/admin/signup', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'username and email are required' });
    }

    const generatedPassword = generateRandomPassword(12); // change length if you want
    const result = await signup(username, email, generatedPassword, 'admin');
    
    // To send mail with login details 
    
    // sendMail(email , username , generatedPassword);

    res.status(201).json({ message: 'User created and password emailed', userId: result.id || result._id || null });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: err.message || 'Signup failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//verify

router.get('/verify', authenticate, (req, res) => {
  try {
    const { id, email, role } = req.user;
    res.status(200).json({
      message: 'Token verified successfully',
      user: { id, email, role },
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
