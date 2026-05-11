import { executeQuery } from "../../config/db.js";


class UserDal {
  
  // test = async()=> {
  //   try {
  //     let sql = 'SELECT * FROM user';
      
  //     let result = await executeQuery(sql);
  //     return result;

  //   } catch (error) {
  //     throw error;
  //   }
  // }

  register = async(values) => {
    try {
      let sql = 'INSERT INTO user (name, lastname, email, password) VALUES (?,?,?,?)';
      let result = await executeQuery(sql,values);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

export default new UserDal();