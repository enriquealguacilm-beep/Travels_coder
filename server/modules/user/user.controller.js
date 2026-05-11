import { executeQuery } from "../../config/db.js";
import userDal from "./user.dal.js";
import bcrypt from 'bcrypt';

class UserController{

  /* test = async(req,res) => {

    try {
      let result = await userDal.test();
      res.status(200).json(result);

    } catch (error) {
      res.status(500).json("userTest falla");
    }
  } */

    register = async(req,res) => {
      try {
        const {name,lastname,email,password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10)

        let values = [name,lastname,email,hashedPassword];
        const result = await userDal.register(values)
        res.status(200).json("todo ok");
        

      } catch (error) {
        
        res.status(500).json(error);
        
      }
    }
}


export default new UserController();