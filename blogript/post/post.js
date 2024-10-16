const form = document.getElementById("new-post-form");

form.addEventListener("submit", (event) =>
{
	event.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	fetch("/api/blog",
	{
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	}).then(() =>
	{
		window.location.replace("/");
	});
});