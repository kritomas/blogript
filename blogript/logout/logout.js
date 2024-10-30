const form = document.getElementById("logout-form");

form.addEventListener("submit", async (event) =>
{
	event.preventDefault();

	delete sessionStorage.userid;
	delete sessionStorage.username;
	window.location.replace("/");
});