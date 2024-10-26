import express from "express";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import {getAllPosts, getPost, createPost, removePost, updatePost,
		createUser, removeUser, getUser} from "./database.js";

const docYaml = YAML.load("/var/blogript-api/openapi.yaml");

const port = 42069;
const api = express();

api.use(express.json());
api.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
api.use("/about", swaggerUi.serve, swaggerUi.setup(docYaml));

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
		const {user_id, content} = req.body;
		const post = await createPost(user_id, content);
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
		const { id } = req.params;
		const { user_id } = req.body;
		const affected = await removePost(user_id, id);
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
		const {user_id, content} = req.body;
		const post = await updatePost(id, user_id, content);
		if (post === undefined) res.status(404).send("Not found");
		else res.status(200).send(post);
	}
	catch (e)
	{
		next(e);
	}
});

api.get("/user", async (req, res, next) =>
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