import { executeQuery } from "../../config/db.js";

class AdminDal {

  dataAdmin = async()=> {
    try {
      let sql = `SELECT 
                  COUNT(*) AS total_users,
                  SUM(CASE WHEN user_is_deleted = 0 THEN 1 ELSE 0 END) AS active_users,
                  SUM(CASE WHEN user_is_deleted = 1 THEN 1 ELSE 0 END) AS disabled_users
                  FROM user WHERE role = 1`;
      const result = await executeQuery(sql);
      return result;
      
    } catch (error) {
      throw error;
    }
  }

  allUsers = async()=> {
    try {
      let sql = 'SELECT * FROM user WHERE role = 1'
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  disableUser = async(user_id)=> {
    try {
      let sql = 'UPDATE user SET user_is_deleted = 1 WHERE user_id = ?'
      await executeQuery(sql,[user_id]);
    } catch (error) {
      throw error
    }
  }
  enableUser = async(user_id)=> {
    try {
      let sql = 'UPDATE user SET user_is_deleted = 2 WHERE user_id = ?'
      await executeQuery(sql,[user_id]);
    } catch (error) {
      throw error
    }
  }

}

export default new AdminDal();