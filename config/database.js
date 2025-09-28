import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();

export default {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: false
    // {
        
    // //   require: false,       
    // //   rejectUnauthorized: false
    // }
  },
  host: 'localhost',   
  port: process.env.POSTGRES_PORT ,           
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};