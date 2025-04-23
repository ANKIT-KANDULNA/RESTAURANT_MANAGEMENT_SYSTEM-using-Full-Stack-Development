const {Pool}=require('pg');

const pool=new Pool({
  user:'postgres',       // my postgres username
  host:'localhost',      // where PostgreSQL is running
  database:'restaurant_management_system',  // my database  name
  password:'kandulna@920',   // my postgres password
  port:5432,             // default postgres port
});

module.exports=pool;