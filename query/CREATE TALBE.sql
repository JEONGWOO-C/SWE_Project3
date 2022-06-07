use market_db;

#유저 정보 table
DROP TABLE if exists users;
CREATE TABLE users(
	name varchar(16) not null,
    phone varchar(11) not null,
    email varchar(32),
    age int default 0 not null,
    id varchar(32) not null primary key,
    pw varchar(16) not null,
    score int default 5 -- default 5 range 0 ~ 10
);
    
#찜 table
DROP TABLE if exists favorite;
CREATE TABLE favorite(
    id varchar(32) not null primary key,
    postnum int not null
);

#posts Table
DROP TABLE if exists posts;
CREATE TABLE posts(
	postnum int not null primary key auto_increment,
    title varchar(32) not null,
    postDate datetime not null,		-- 게시글 작성시간
    views int default 0,			-- 조회수
    fav int default 0,				-- 찜횟수
    teens int default 0,			-- 10대
    twenties int default 0,			-- 20대
    thirties int default 0,			-- 30대
    fourties int default 0,			-- 40대
    fifties int default 0,			-- 50대
    overSixties int default 0		-- 60대 이상
    );

#product Table
DROP TABLE if exists product;
CREATE TABLE product(
	postnum int not null primary key,	# 글번호
	price int default 0,				# 가격
    category varchar(16) not null,		# 제품 종류
    descript varchar(512) default "",	# 제품 설명
    seller_id varchar(32) not null,		# 판매자 ID
    isSelling boolean default true		# 판매여부
    );

#photos Table
DROP TABLE if exists photos;
CREATE TABLE photos(
    postnum int not null primary key,	# 계시글 번호
    imgnum int not null,				# 이미지 번호
	height int not null default 500,	# 이미지 높이
    width int not null default 500,		# 이미지 너비
    photo varchar(64)					# 이미지 URL
    );

#comments Table
DROP TABLE if exists comments;
CREATE TABLE comments(
	id varchar(64) not null primary key,	# 작성자 아이디
	postnum int not null,					# 게시글 번호
    msg varchar(32) not null,				# 댓글 내용
    commentDate datetime not null			# 작성 시간
    );

# chats 
DROP TABLE if exists chats;
CREATE TABLE chats(
	seller_id varchar(32) not null,		# 판매자 아이디
	buyer_id varchar(32) not null,		# 구매자 아이디
	writer varchar(32) not null,		# 작성자 아이디
	postnum int not null primary key,	# 게시글 번호
    msg varchar(32) not null,			# 채팅 내용
    chatDate datetime not null			# 채팅 작성 시간
    );

# reports Table
DROP TABLE if exists reports;
CREATE TABLE reports(
	writer varchar(32) not null primary key,	# 작성자 아이디
	postnum int not null,						# 게시글 번호
    reason varchar(32) not null,				# 댓글 내용
    reportDate datetime not null);				# 작성 시간

# 연령별 거래량 통계정보 table
DROP TABLE if exists agePreffered;
CREATE TABLE agePreffered(
	category varchar(16) not null primary key,
    teens int default 0,			-- 10대
    twenties int default 0,			-- 20대
    thirties int default 0,			-- 30대
    fourties int default 0,			-- 40대
    fifties int default 0,			-- 50대
    overSixties int default 0		-- 60대 이상
);

#최근 본 게시물 table 
DROP TABLE if exists recentPosts;
CREATE TABLE recentPosts(
	id varchar(32) not null primary key,
    postnum int not null,
    viewDate datetime not null
);

#set Table Columm
#ALTER TABLE users add name varchar(16) not null;
#ALTER TABLE users add phone varchar(11) not null;
#ALTER TABLE users add email varchar(32);
#ALTER TABLE users add id varchar(32) not null primary key;
#ALTER TABLE users add pw varchar(16) not null;
#ALTER TABLE users add addr varchar(64);
#ALTER TABLE users add score int default 5;