import mysql from 'mysql2/promise'; //promise porque va a tener peticiones asyncronas
import dotenv from 'dotenv';

dotenv.config();
//creacion de una pool

export const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export const executeQuery = async(sql, values=[]) => {
  let connection;
  try {
    //abrir una nueva conexion a la pool
    connection = await dbPool.getConnection()

    //ejecutar la sql
    let [result] = await connection.query(sql,values);
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);
    throw error;
    
  }finally {
    //liberar los recursos(cerrar la conexion)

    if(connection){
      connection.release();
    }
  } 
}