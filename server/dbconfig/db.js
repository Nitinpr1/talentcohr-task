import mysql from "mysql2/promise";

//creating mysql connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testdb",
});

export default db;
