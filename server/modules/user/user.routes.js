import express from 'express';
import userController from './user.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { uploadImage } from '../../middlewares/multerSingle.js';


const router = express.Router();


//url: http://localhost:5000/api/users/register
router.post('/register', userController.register);


router.post('/login', userController.login);

router.get('/userById',verifyToken ,userController.userById);

router.put('/editUser', verifyToken, uploadImage("users"), userController.editUser)

export default router;