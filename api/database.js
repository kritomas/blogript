import fs from "fs";
import mysql from "mysql2";
import bcrypt from "bcrypt";

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
	const result = await pool.query("delete from Post where id = ?;", [id]);
	return result[0].affectedRows;
}
export async function updatePost(id, author, content)
{
	const result = await pool.query("update Post set author=?, content=? where id=?;", [author, content, id]);
	if (result[0].affectedRows <= 0) return undefined;
	return await getPost(id);
}

export async function getUser(username, password)
{
	let result = await pool.query("select password_hash from User where username = ?;", [username]);
	if (result[0].length <= 0) return {};
	const password_hash = result[0][0]["password_hash"];
	if (!bcrypt.compare(password, password_hash))
	{
		return {};
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

console.log(await removeUser("0dab64f6-8f77-11ef-a4f4-e00af6b185a1"));
console.log(await createUser("kritomas", "YOOO"));
console.log(await getUser("kritomas", "YOOO"));