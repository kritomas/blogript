import express from "express";

import {getAllPosts, getPost, createPost, removePost, updatePost} from "./database.js";

const port = 42069;
const api = express();

api.use(express.json())

api.get("/status", (req, res) =>
{
	res.status(200).send("It's alive!");
});

api.get("/blog", async (req, res) =>
{
	const posts = await getAllPosts();
	res.status(200).send(posts);
});
api.get("/blog/:id", async (req, res) =>
{
	const id = req.params.id;
	const post = await getPost(id);
	if (post === undefined) res.status(404).send("Not found");
	else res.status(200).send(post);
});

api.post("/blog", async (req, res) =>
{
	const {author, content} = req.body;
	const post = await createPost(author, content);
	if (post === undefined) res.status(404).send("Not found");
	else res.status(200).send(posts);
	res.status(201).send(post);
})

api.delete("/blog/:id", async (req, res) =>
{
	const id = req.params.id;
	const affected = await removePost(id);
	if (affected > 0) res.status(200).send("");
	else res.status(404).send("Not found");
});
api.patch("/blog/:id", async (req, res) =>
{
	const id = req.params.id;
	const {author, content} = req.body;
	const post = await updatePost(id, author, content);
	if (post === undefined) res.status(404).send("Not found");
	else res.status(200).send(post);
});

api.use((err, req, res, next) =>
{
	console.error(err.stack);
	res.status(500).send("It's borked");
});

api.listen(port, () =>
{
	console.log("Blogript API listening at " + port);
})