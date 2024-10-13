# Blogript

A blog server thingy.

# Installation

+	Install nginx and nodejs.
+	Copy `blogript.conf` into `/etc/nginx/sites-available/`.
+	Copy all of `blogript` into `/var`.
+	Enable the site by symlinking `/etc/nginx/sites-available/blogript.conf` into `/etc/nginx/sites-enabled/`.
+	Install API modules by invoking `npm i` in `api`.
+	Start API server by invoking `node main.js` in `api`.
+	Start nginx.