create table User
(
	id varchar(36) primary key default UUID(),
	username varchar(32) not null unique,
	password_hash varchar(4096) not null,
	is_admin bit not null default 0
);

create table Post
(
	id integer primary key auto_increment,
	User_id varchar(36) not null,
	creation_date date not null default now(),
	content varchar(16000) not null,
	foreign key (User_id) references User(id)
);

create table Blacklist
(
	id integer primary key auto_increment,
	User_id varchar(36) not null,
	Post_id integer not null,
	foreign key (User_id) references User(id),
	foreign key (Post_id) references Post(id)
);