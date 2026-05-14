import express from 'express';
import adminController from './admin.controller.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

router.get("/dataAdmin",verifyToken, adminController.dataAdmin);

router.get("/allUsers",verifyToken, adminController.allUsers);

router.put("/disableUser",verifyToken, adminController.disableUser);

router.put("/enableUser",verifyToken, adminController.enableUser); 



export default router;