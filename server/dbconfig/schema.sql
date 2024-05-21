use testdb;
create table tblUser_Role(
 id INT AUTO_INCREMENT PRIMARY KEY,
 role_name varchar(50) not null
);

-- user role table
select * from tblUser_Role;

insert into tblUser_Role (role_name) values("admin");
insert into tblUser_Role (role_name) values("company");
insert into tblUser_Role (role_name) values("normal user");

--tblUser for every type of user
create table tblUser(
id int AUTO_INCREMENT primary key,
username varchar(50) not null,
pass varchar(30) not null,
roleid int,
foreign key (roleid) references tblUser_Role(id)
);

select * from tblUser;
 
insert into tblUser (username, pass, roleid) values ("admin", "admin123", 1);
insert into tblUser (username, pass, roleid) values ("company1", "company1", 2);
insert into tblUser (username, pass, roleid) values ("normaluser", "user123", 3);

--table for company information
create table tblCompanies(
id int auto_increment primary key,
companyName varchar(100) not null,
email varchar(100) not null,
address varchar(200) not null,
companyDesc varchar(500) not null,
companyId int not null,
foreign key (companyId) references tblUser(id)
);

select * from tblCompanies;