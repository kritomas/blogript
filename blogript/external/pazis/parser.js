const url = "http://52.58.163.44";

function parseByJson(post)
{
	result = "<div class=\"post\">";
	result += "<p><b>" + post.title + "</b></p>";
	result += "<p>" + post.contents + "</p>";
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
	if (sessionStorage.userid === undefined)
	{
		window.location.replace("/login");
		return;
	}
	try
	{
		const response = await fetch(url + "/api/blog");
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