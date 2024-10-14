# Blogript

A blog server thingy.

# Installation

1.	Install dependencies: `nginx`, `nodejs`, `npm`.
2. You'll also need a MySQL server.

## Frontend

1.	Copy `blogript.conf` into `/etc/nginx/sites-available/`.
2.	Copy all of `blogript` into `/var`.
3.	Enable the site by symlinking `/etc/nginx/sites-available/blogript.conf` into `/etc/nginx/sites-enabled/`.

## API

1.	Install API modules by invoking `npm i` in `api`.
2.	Start API server by invoking `node main.js` in `api`.
3.	Start nginx.

## Database

1. In your MySQL server, create a databse and invoke `database/init.sql`.
2. Create file `api/sql_credentials.json` with the following format:

```json
`{
	"host": "[server ip address here]",
	"user": "[db username here]",
	"password": "[db user password here]",
	"database": "[your database name here]"
}
``