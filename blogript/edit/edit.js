const form = document.getElementById("edit-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	const formData = new FormData(form);

	if (sessionStorage.userid === undefined)
	{
		window.location.replace("/login");
		return;
	}

	const data = Object.fromEntries(formData.entries());
	data.user_id = sessionStorage.userid;

	const urlParams = new URL(window.location.toLocaleString()).searchParams;

	try
	{
		response = await fetch("/api/blog/" + urlParams.get("postid"),
		{
			method: "PATCH",
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