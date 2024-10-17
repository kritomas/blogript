const form = document.getElementById("remove-post-form");

form.addEventListener("submit", (event) =>
{
	event.preventDefault();

	const urlParams = new URL(window.location.toLocaleString()).searchParams;

	fetch("/api/blog/" + urlParams.get("postid"),
	{
		method: "DELETE"
	}).then(() =>
	{
		window.location.replace("/");
	});
});