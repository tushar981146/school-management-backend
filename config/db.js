import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";


const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "schoolmanagement"
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

export default db;
