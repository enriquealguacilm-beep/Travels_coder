import adminDal from "./adminDal.js";

class AdminController {

  dataAdmin = async(req,res)=> {
    try {

      const [result] = await adminDal.dataAdmin()
      res.status(200).json({message:"ok", result});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
      
    }
  }


  allUsers = async(req,res) => {
    try {
      const result = await adminDal.allUsers();
      res.status(200).json({message:"osssssk", result});
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  disableUser = async(req,res) => {
    try {
      const {user_id} = req.body;
      await adminDal.disableUser(user_id);
      res.status(200).json("estoy en disable")
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

   enableUser = async(req,res) => {
    try {
      const {user_id} = req.body;
      await adminDal.enableUser(user_id);
      res.status(200).json("estoy en enable")
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

}

export default new AdminController();