const url = "http://3.66.188.13:8080";

function parseByJson(post)
{
	result = "<div class=\"post\">";
	result += "<p><b>" + post.title + "</b> (" + post.created + ")</p>";
	result += "<p>" + post.post + "</p>";
	result += "</div>"
	return result;
}
async function parseById(id)
{
	try
	{
		const response = await fetch("/api/notes/" + id);
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
	if (sessionStorage.userid === undefined)
	{
		window.location.replace("/login");
		return;
	}
	try
	{
		const response = await fetch(url + "/api/notes/");
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