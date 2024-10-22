const form = document.getElementById("new-post-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	if (sessionStorage.userid === undefined)
	{
		window.location.replace("/login");
		return;
	}
	data.user_id = sessionStorage.userid;
	//console.log(data.user_id);
	console.log(sessionStorage.userid);

	try
	{
		response = await fetch("/api/blog",
		{
			method: "POST",
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