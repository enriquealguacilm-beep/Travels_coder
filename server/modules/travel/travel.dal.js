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
      let sql = 'SELECT * FROM images WHERE travel_id = ? AND image_is_deleted = 0';
      return await executeQuery(sql,[travel_id])
    } catch (error) {
      throw error
    }
  }


  deletePic = async(values) => {
    try {
      let sql = 'DELETE FROM images WHERE image_id = ? AND travel_id = ?';
      await executeQuery(sql, values);
    } catch (error) {
      throw error
    }
  }

  addPics = async(travel_id, files) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
      //averiguar cualk es el mayor image_id para saber por donde tengo que seguir guardando
        let sqlMaxId =`SELECT IFNULL(MAX(image_id), 0) AS max_id FROM images WHERE travel_id = ?`;
        const [result] = await connection.query(sqlMaxId, [travel_id]);
        let {max_id} = result[0];

        //inserción de las fotos
        files.forEach(async(elem) => {
          max_id++;
          let sqlImage = `INSERT INTO images (image_id, travel_id, file) VALUES (?,?,?)`;
          await connection.query(sqlImage,[max_id, travel_id, elem.filename])
        })
        
        //pedir a la base de datos las imagenes actualizadas para este viaje
        let sqlNewPics = 'SELECT * FROM images WHERE travel_id = ?';
        const [resultNewPics] = await connection.query(sqlNewPics,[travel_id]);
        
        await connection.commit()
        return resultNewPics;
    } catch (error) {
        await connection.rollback();
        throw error
    } finally{
      connection.release();
    }
  }

  delLogicTravel = async(travel_id) => {
    try {
      let sql = `UPDATE travel t LEFT JOIN images i 
                ON t.travel_id = i.travel_id
                SET t.travel_is_deleted = 1,
                i.image_is_deleted = 1 
                WHERE t.travel_id = ?`;
      await executeQuery(sql, [travel_id]); 
    } catch (error) {
      throw error
    }
  }
}

export default new TravelDal();