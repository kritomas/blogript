const form = document.getElementById("new-post-form");

form.addEventListener("submit", (event) =>
{
	event.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	const urlParams = new URL(window.location.toLocaleString()).searchParams;

	fetch("/api/blog/" + urlParams.get("postid"),
	{
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	}).then(() =>
	{
		window.location.replace("/");
	});
});