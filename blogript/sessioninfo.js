const header = document.getElementById("header");

if (sessionStorage.username !== undefined)
{
	const space = document.getElementById("sessioninfo");
	space.innerHTML = "Logged in as <b>" + sessionStorage.username + "</b> <a href='/logout'>Logout</a>"
}