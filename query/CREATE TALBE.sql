use market_db;

#users Table
DROP TABLE if exists users;
CREATE TABLE users(
	name varchar(16) not null,
    phone varchar(11) not null,
    email varchar(32),
    id varchar(32) not null primary key,
    pw varchar(16) not null,
    addr varchar(64),
    score int default 5);
    
#favorite Table
DROP TABLE if exists favorite;
CREATE TABLE favorite(
    id varchar(32) not null primary key,
    pw varchar(16) not null);

#posts Table
DROP TABLE if exists posts;
CREATE TABLE posts(
	postnum int not null primary key,
    title varchar(32) not null,
    datas datetime not null,
    views int default 0,
    fav int default 0,
    addr varchar(64));

#product Table
DROP TABLE if exists product;
CREATE TABLE product(
	postnum int not null primary key,	# 글번호
	price int default 0,				# 가격
    category varchar(16) not null,		# 제품 종류
    descript varchar(512) default "",	# 제품 설명
    seller_id varchar(32) not null);	# 판매자 아이디

#photos Table
DROP TABLE if exists photos;
CREATE TABLE photos(
    postnum int not null primary key,	# 계시글 번호
    photo varchar(64));					# 이미지 URL

#comments Table
DROP TABLE if exists comments;
CREATE TABLE comments(
	id varchar(64) not null primary key,	# 작성자 아이디
	postnum int not null,					# 게시글 번호
    comment varchar(32) not null,			# 댓글 내용
    dates datetime not null);				# 작성 시간

# chats 
DROP TABLE if exists comments;
CREATE TABLE comments(
	sell_id varchar(32) not null,		# 판매자 아이디
	buy_id varchar(32) not null,		# 구매자 아이디
	writer varchar(32) not null,		# 작성자 아이디
	postnum int not null primary key,	# 게시글 번호
    msg varchar(32) not null,			# 댓글 내용
    dates datetime not null);			# 작성 시간

# reports Table
DROP TABLE if exists reports;
CREATE TABLE reports(
	writer varchar(32) not null primary key,	# 작성자 아이디
	postnum int not null,						# 게시글 번호
    reason varchar(32) not null,				# 댓글 내용
    dates datetime not null);					# 작성 시간

#set Table Columm
#ALTER TABLE users add name varchar(16) not null;
#ALTER TABLE users add phone varchar(11) not null;
#ALTER TABLE users add email varchar(32);
#ALTER TABLE users add id varchar(32) not null primary key;
#ALTER TABLE users add pw varchar(16) not null;
#ALTER TABLE users add addr varchar(64);
#ALTER TABLE users add score int default 5;