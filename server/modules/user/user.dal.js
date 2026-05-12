import { executeQuery } from "../../config/db.js";


class UserDal {
  
  register = async(values) => {
    try {
      let sql = 'INSERT INTO user (name, lastname, email, password) VALUES (?,?,?,?)';
      let result = await executeQuery(sql,values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  findUserbyEmail = async(email) => {
    try {
      let sql = 'SELECT * FROM user WHERE email = ? AND user_is_deleted = 0';
      let result = await executeQuery(sql,[email]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  userById = async(id)=> {
    try {
      let sql = 'SELECT * FROM user WHERE user_id = ? AND user_is_deleted = 0';
      return await executeQuery(sql, [id]);

    } catch (error) {
      throw error;
    }
  }

  editUser= async(id, data, filename) => {
    try {
      let sql = 'UPDATE user SET name= ?, lastname=?,address=?, phone=? WHERE user_id = ?'; 
      let values = [...data, id];
      if(filename){
        sql = 'UPDATE user SET name= ?, lastname=?,address=?, phone=?, avatar=? WHERE user_id =?'; 
        values = [...data, filename, id];
      }
      await executeQuery(sql,values);
    } catch (error) {
      throw error
    }
  }

}

export default new UserDal();