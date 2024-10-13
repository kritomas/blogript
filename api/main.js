import express from "express";

const port = 42069;
const api = express();

api.get("/status", (req, res) =>
{
	res.status(200).send("It's alive!");
})

api.listen(port, () =>
{
	console.log("Blogript API listening at " + port);
})