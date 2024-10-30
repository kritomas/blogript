function parseByJson(post)
{
	result = "<div class=\"post\">";
	result += "<p><b>" + post.author + "</b> has posted (id " + post.id + ") at " + post.creation_date + ":</p>";
	result += "<p>" + post.content + "</p>";
	result += "<a href=\"/edit?postid=" + post.id + "\">Edit</a> ";
	result += "<a href=\"/remove?postid=" + post.id + "\">Remove</a>";
	result += "<a href=\"/addblacklist?postid=" + post.id + "\">Blacklist Users</a>";
	result += "<a href=\"/removeblacklist?postid=" + post.id + "\">Unblacklist Users</a>";
	result += "</div>"
	return result;
}
async function parseById(id)
{
	try
	{
		const response = await fetch("/api/blog/" + id);
		if (!response.ok) throw response;
		const data = await response.json();
		result = "<div class=\"post-space\">";
		result += parseByJson(p);
		result += "</div>";
		return result;
	}
	catch (error)
	{
		window.location.replace("/error");
		throw error;
	}
}
async function parseAll()
{
	try
	{
		const response = await fetch("/api/blog");
		if (!response.ok) throw response;
		const data = await response.json();
		result = "<div class=\"post-space\">";
		data.forEach((item, i) =>
		{
			result += parseByJson(item);
		});
		result += "</div>";
		return result;
	}
	catch (error)
	{
		window.location.replace("/error");
		throw error;
	}
}

async function insertIntoDOM()
{
	html = await parseAll();
	document.getElementById("post-space").innerHTML = html;
}

insertIntoDOM();