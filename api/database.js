import fs from "fs";
import mysql from "mysql2";
import bcrypt from "bcrypt";

const pool = mysql.createPool(JSON.parse(fs.readFileSync("sql_credentials.json", "utf8"))).promise();

export async function getAllPosts()
{
	const result = await pool.query("select Post.id, username, content, creation_date from Post inner join User on User.id = Post.User_id;");
	const rows = result[0];
	return rows;
}
export async function getPost(id)
{
	const result = await pool.query("select Post.id, username, content, creation_date from Post inner join User on User.id = Post.User_id where Post.id = ?;", [id]);
	const rows = result[0];
	return rows[0];
}
export async function createPost(author_id, content)
{
	const result = await pool.query("insert into Post (User_id, content) values (?, ?);", [author_id, content]);
	return await getPost(result[0].insertId);
}
export async function removePost(author_id, id)
{
	const result = await pool.query("delete from Post where id = ? and User_id = ?;", [id, author_id]);
	return result[0].affectedRows;
}
export async function updatePost(id, author_id, content)
{
	const result = await pool.query("update Post set content=? where id=? and User_id=?;", [content, id, author_id]);
	if (result[0].affectedRows <= 0) return undefined;
	return await getPost(id);
}

export async function getUser(username, password)
{
	let result = await pool.query("select password_hash from User where username = ?;", [username]);
	if (result[0].length <= 0) return undefined;
	const password_hash = result[0][0]["password_hash"];
	if (!bcrypt.compare(password, password_hash))
	{
		return undefined;
	}
	result = await pool.query("select id from User where username = ?;", [username]);
	const rows = result[0];
	return rows[0];
}
export async function createUser(username, password)
{
	const password_hash = await bcrypt.hash(password, 10);
	const result = await pool.query("insert into User (username, password_hash) values (?, ?);", [username, password_hash]);
	return await getUser(username, password);
}
export async function removeUser(id)
{
	const result = await pool.query("delete from User where id = ?;", [id]);
	return result[0].affectedRows;
}