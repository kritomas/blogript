import express from "express";
import session from "express-session";

import {getAllPosts, getPost, createPost, removePost, updatePost,
		createUser, removeUser, getUser} from "./database.js";

const port = 42069;
const api = express();

api.use(express.json());
api.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

api.get("/status", (req, res) =>
{
	res.status(200).send("It's alive!");
});

api.get("/blog", async (req, res, next) =>
{
	try
	{
		const posts = await getAllPosts();
		res.status(200).send(posts);
	}
	catch (e)
	{
		next(e);
	}
});
api.get("/blog/:id", async (req, res, next) =>
{
	try
	{
		const id = req.params.id;
		const post = await getPost(id);
		if (post === undefined) res.status(404).send("Not found");
		else res.status(200).send(post);
	}
	catch (e)
	{
		next(e);
	}
});

api.post("/blog", async (req, res, next) =>
{
	try
	{
		const {author_id, content} = req.body;
		const post = await createPost(author_id, content);
		if (post === undefined) res.status(404).send("Not found");
		else res.status(201).send(post);
	}
	catch (e)
	{
		next(e);
	}
})

api.delete("/blog/:id", async (req, res, next) =>
{
	try
	{
		const { author_id, id } = req.params;
		const affected = await removePost(author_id, id);
		if (affected > 0) res.status(200).send("");
		else res.status(404).send("Not found");
	}
	catch (e)
	{
		next(e);
	}
});

api.patch("/blog/:id", async (req, res, next) =>
{
	try
	{
		const id = req.params.id;
		const {author, content} = req.body;
		const post = await updatePost(id, author, content);
		if (post === undefined) res.status(404).send("Not found");
		else res.status(200).send(post);
	}
	catch (e)
	{
		next(e);
	}
});

api.put("/user", async (req, res, next) =>
{
	try
	{
		const {username, password} = req.body;
		const user = await getUser(username, password);
		if (user === undefined) res.status(404).send("Not found");
		else res.status(200).send(user);
	}
	catch (e)
	{
		next(e);
	}
});

api.post("/user", async (req, res, next) =>
{
	try
	{
		const {username, password} = req.body;
		const user = await createUser(username, password);
		if (user === undefined) res.status(404).send("Not found");
		else res.status(201).send(user);
	}
	catch (e)
	{
		next(e);
	}
})

api.delete("/user", async (req, res, next) =>
{
	try
	{
		const id = req.body.id;
		const affected = await removeUser(id);
		if (affected > 0) res.status(200).send("");
		else res.status(404).send("Not found");
	}
	catch (e)
	{
		next(e);
	}
});

api.use((err, req, res, next) =>
{
	console.error(err.stack);
	res.status(500).send(err);
});

api.listen(port, () =>
{
	console.log("Blogript API listening at " + port);
})