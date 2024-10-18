const form = document.getElementById("remove-post-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	const urlParams = new URL(window.location.toLocaleString()).searchParams;

	try
	{
		response = await fetch("/api/blog/" + urlParams.get("postid"),
		{
			method: "DELETE"
		});
		if (response.status / 100 !== 2) throw response;
		window.location.replace("/");
	}
	catch (error)
	{
		window.location.replace("/error");
		throw error;
	}
});