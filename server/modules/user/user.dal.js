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
      let sql = `SELECT
          u.user_id, u.name, u.lastname, u.address, u.phone, u.email, u.avatar, u.role,
          t.travel_id, t.title, t.country, t.city, t.description, t.travel_date
          FROM user u
          LEFT JOIN travel t
          ON u.user_id = t.user_id
          AND u.user_is_deleted = 0
          AND t.travel_is_deleted = 0
          WHERE u.user_id = ?
      `
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