import { dbPool, executeQuery } from "../../config/db.js";

class TravelDal{

  newTravel = async (data) => {
    //abrir una nueva conexion
    const connection = await dbPool.getConnection();
    console.log(data);
    
    try {
      //transacción
      await connection.beginTransaction();

      //insertar un nuevo viaje
      let sql = 'INSERT INTO travel (title,country,city,description,travel_date, user_id) values (?,?,?,?,?,?)';

      const [result] = await connection.query(sql, data.values)

      //rescatar el id de ese nuevo viaje
      const newTravel_id = result.insertId;

      //inserciones de cada una de las fotos
      let image_id = 0;
      data.files.forEach(async(foto)=>{
        image_id++
        let sqlImg = 'INSERT INTO images (image_id, travel_id, file) VALUES (?,?,?)';
        let valuesImg = [image_id , newTravel_id, foto.filename];
        await connection.query(sqlImg, valuesImg);
      })
      //confirmar la transacción
      await connection.commit();
      return newTravel_id;
    } catch (error) {
      //deshacer la transacción
      await connection.rollback();
      throw error
    }
    finally {
      //cierro la conexion
      connection.release();
    }
  }

  editTravel = async(values) => {
    try {
      let sql = `UPDATE travel SET title= ?, country = ?, city = ?, description= ?, travel_date = ?
                  WHERE travel_id = ?`;
      await executeQuery(sql,values);
    } catch (error) {
      throw error
    }
  }


  picsByTravel = async(travel_id) => {
    try {
      let sql = 'SELECT * FROM images WHERE travel_id = ?';
      return await executeQuery(sql,[travel_id])
    } catch (error) {
      throw error
    }
  }
}

export default new TravelDal();