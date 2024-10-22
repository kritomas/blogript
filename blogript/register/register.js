const form = document.getElementById("register-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	try
	{
		response = await fetch("/api/user",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
		if (!response.ok) throw response;
		sessionStorage.userid = response.id;
		window.location.replace("/");
	}
	catch (error)
	{
		window.location.replace("/error");
		throw error;
	}
});