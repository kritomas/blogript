# Blogript

A blog server thingy.

# Installation

1.	Install dependencies: `nginx`, `nodejs`, `npm`.
2. You'll also need a MySQL server.

## Gateway

1.	Copy `blogript.conf` into `/etc/nginx/sites-available/`.
2.	Enable the gateway by symlinking `/etc/nginx/sites-available/blogript.conf` into `/etc/nginx/sites-enabled/`.

## Frontend

1.	Copy all of `blogript` into `/var`.

# Database

1. In your MySQL server, create a databse and invoke `database/init.sql`.
2. Create file `blogript-api/sql_credentials.json` with the following format:

```json
{
	"host": "[server ip address here]",
	"user": "[db username here]",
	"password": "[db user password here]",
	"database": "[your database name here]"
}
```

## API

1.	Install API modules by invoking `npm i` in `blogript-api`.
2.	Copy all of `blogript-api` into `/var`.
3.	Copy `blogript-api.service` into `/etc/systemd/system`.