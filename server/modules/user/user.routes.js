import express from 'express';
import userController from './user.controller.js';

const router = express.Router();

// url: http://localhost:5000/api/users/userTest
/* router.get('/userTest', userController.test) */

//url: http://localhost:5000/api/users/register
router.post('/register', userController.register)

export default router;