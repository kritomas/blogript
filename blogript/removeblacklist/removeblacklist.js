const form = document.getElementById("username-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());
	const urlParams = new URL(window.location.toLocaleString()).searchParams;

	if (sessionStorage.userid === undefined)
	{
		window.location.replace("/login");
		return;
	}

	data.user_id = sessionStorage.userid;
	data.post_id = urlParams.get("postid");

	try
	{
		response = await fetch("/api/blacklist",
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