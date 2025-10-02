import pg from 'pg';

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
  host: 'aws-1-sa-east-1.pooler.supabase.com',   
  port: process.env.POSTGRES_PORT ,           
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};