const form = document.getElementById("new-post-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	const urlParams = new URL(window.location.toLocaleString()).searchParams;

	try
	{
		response = await fetch("/api/blog/" + urlParams.get("postid"),
		{
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
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