create table Post
(
	id integer primary key auto_increment,
	creation_date date not null default now(),
	author varchar(32) not null,
	content varchar(4096)
);