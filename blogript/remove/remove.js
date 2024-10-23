const form = document.getElementById("remove-post-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	const urlParams = new URL(window.location.toLocaleString()).searchParams;

	if (sessionStorage.userid === undefined)
	{
		window.location.replace("/login");
		return;
	}

	try
	{
		let data = {};
		data.user_id = sessionStorage.userid;

		response = await fetch("/api/blog/" + urlParams.get("postid"),
		{
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		if (!response.ok) throw response;
		window.location.replace("/");
	}
	catch (error)
	{
		window.location.replace("/error");
		throw error;
	}
});