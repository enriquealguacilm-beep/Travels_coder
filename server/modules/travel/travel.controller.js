import { delFile } from "../../utils/fsUtils.js";
import travelDal from "./travel.dal.js";

class TravelController{

  newTravel = async(req,res) => {
    try {
      const {user_id} = req.params;
      const {title,country,city,description,travel_date} = JSON.parse(req.body.newTravel);
      const values = [title,country,city,description,travel_date, user_id];
      const files = req.files

      let travel_id = await travelDal.newTravel({values, files})
      res.status(200).json({message:"new travel",travel_id});
    } catch (error) {
      console.log(error);
      
      res.status(500).json(error);
    }
  }

  editTravel = async(req,res) => {
    try {
      console.log(req.body);
      const {travel_id,title,country,city,description,travel_date} = req.body;
      const values = [title,country,city,description,travel_date, travel_id ]
      await travelDal.editTravel(values)
      res.status(200).json({message:"edit ok"})
      
    } catch (error) {
      res.status(500).json(error)
    }
  }

  picsByTravel = async(req,res) =>{
    try {
      const {travel_id} = req.params;
      const result = await travelDal.picsByTravel(travel_id);
      res.status(200).json(result);
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
      
    }
  }


  delPic = async(req,res) => {
    try {
      const {image_id, travel_id, file} = req.params;
      let values = [image_id, travel_id];
      await travelDal.deletePic(values);
      await delFile(file,"travel")
      res.status(200).json({message:'borrado ok'})
    } catch (error) {
      console.log(error);
      
      res.status(500).json(error)
    }
  }
  
  
  addPics = async(req,res) => {
    try {
      
      
      const {travel_id} = req.params;
      const newPics = await travelDal.addPics(travel_id, req.files);

      res.status(200).json({message:"ok", data:newPics});
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  } 

  delLogicTravel = async(req,res) => {
    try {
      console.log(req.body);
      const {travel_id} = req.body;
      await travelDal.delLogicTravel(travel_id)
      res.status(200).json({message:'del ok'})
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
      
    }
  }

}


export default new TravelController();