import fs from "fs";
import mysql from "mysql2";

const pool = mysql.createPool(JSON.parse(fs.readFileSync("sql_credentials.json", "utf8"))).promise();

export async function getAllPosts()
{
	const result = await pool.query("select id, author, content, creation_date from Post;");
	const rows = result[0];
	return rows;
}
export async function getPost(id)
{
	const result = await pool.query("select id, author, content, creation_date from Post where id = ?;", [id]);
	const rows = result[0];
	return rows[0];
}
export async function createPost(author, content)
{
	const result = await pool.query("insert into Post (author, content) values (?, ?);", [author, content]);
	return await getPost(result[0].insertId);
}
export async function removePost(id)
{
	const result = await pool.query("delete from Post where id = ?", [id]);
	return result[0].affectedRows;
}