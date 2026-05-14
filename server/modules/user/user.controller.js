import { executeQuery } from "../../config/db.js";
import userDal from "./user.dal.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserController{


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

    login = async(req,res) => {

      try {
        const {email, password} = req.body;
        //1.ver si el usuario existe
        const result = await userDal.findUserbyEmail(email)
        
        if (!result.length) {
          res.status(401).json({message:"Email no existe"})
        }
        else {
          //2.comprobar que la password es correcta
          let match =  await bcrypt.compare(password, result[0].password);
          if(!match){

            res.status(401).json({message:"Contraseña incorrecta"})
          }
          else {
            //3. Generar un token
            
            const token = await jwt.sign({id: result[0].user_id}, process.env.SECRET_KEY,{expiresIn:'30d'})
            res.status(200).json({message: "login ok", token});

          }
        }
        

      } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
      }


    }

    userById = async(req,res) => {
      try {
        const {user_id } = req;
        const result = await userDal.userById(user_id);
        
        
        let user= {
          user_id,
          name: result[0].name,
          lastname: result[0].lastname,
          address: result[0].addres,
          phone: result[0].phone,
          email: result[0].email,
          avatar: result[0].avatar,
          role: result[0].role
        }

        let travels = []

      
        result.forEach(elem => {
          let viaje = {
            user_id,
            travel_id: elem.travel_id,
            title: elem.title,
            country: elem.country,
            city: elem.city,
            description: elem.description,
            travel_date: elem.travel_date
          }
          if (elem.travel_id){
            travels.push(viaje);
          }
        })


        res.status(200).json({user, travels});
        
      } catch (error) {
        console.log(error);
        
        res.status(500).json(error)
      }
    }

    editUser = async(req,res) => {
      try {
        const {user_id} = req;
        console.log(req.body);
        const {name,lastname, phone,address} = JSON.parse(req.body.data);
        let data = [name,lastname,phone,address]
        let filename;
        if(req.file){
          filename = req.file.filename;
        }

        await userDal.editUser(user_id,data,filename)
        
        res.status(200).json({message:"update ok", filename})
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
      }
    }
}


export default new UserController();