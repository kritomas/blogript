function parseByJson(post)
{
	result = "<div class=\"post\">";
	result += "<p><b>" + post.author + "</b> has posted (id " + post.id + ") at " + post.creation_date + ":</p>";
	result += "<p>" + post.content + "</p>";
	result += "<a href=\"/edit?postid=" + post.id + "\">Edit</a> ";
	result += "<a href=\"/remove?postid=" + post.id + "\">Remove</a>";
	result += "</div>"
	return result;
}
async function parseById(id)
{
	const response = fetch("/api/blog/" + id);
	const data = response.json();
	result = "<div class=\"post-space\">";
	result += parseByJson(p);
	result += "</div>";
	return result;
}
async function parseAll()
{
	const response = await fetch("/api/blog");
	const data = await response.json();
	result = "<div class=\"post-space\">";
	data.forEach((item, i) =>
	{
		result += parseByJson(item);
	});
	result += "</div>";
	return result;
}

async function insertIntoDOM()
{
	html = await parseAll();
	document.getElementById("post-space").innerHTML = html;
}

insertIntoDOM();