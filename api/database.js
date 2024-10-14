import fs from "fs";
import mysql from "mysql2";

const pool = mysql.createPool(JSON.parse(fs.readFileSync("sql_credentials.json", "utf8"))).promise();
const result = await pool.query("select * from Post");
console.log(result);