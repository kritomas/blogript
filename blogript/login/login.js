const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	try
	{
		response = await fetch("/api/user",
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		if (!response.ok) throw response;
		const body = await response.json();
		sessionStorage.userid = body.id;
		sessionStorage.username = body.username;
		window.location.replace("/");
	}
	catch (error)
	{
		window.location.replace("/error");
		throw error;
	}
});