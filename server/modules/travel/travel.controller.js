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

}


export default new TravelController();