import express from 'express';
import travelController from './travel.controller.js';
import { uploadImages } from '../../middlewares/multerMultiple.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

router.post('/newTravel/:user_id', verifyToken ,uploadImages("travel"),travelController.newTravel);

router.put('/editTravel', verifyToken, travelController.editTravel);

router.get('/picsByTravel/:travel_id', verifyToken, travelController.picsByTravel);

router.delete('/delPic/:image_id/:travel_id/:file',verifyToken,travelController.delPic);

router.post('/addPics/:travel_id', verifyToken, uploadImages("travel"),travelController.addPics);

router.put('/delLogicTravel', verifyToken, travelController.delLogicTravel);

export default router;