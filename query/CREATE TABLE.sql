use market_db;

#유저 정보 table
DROP TABLE if exists users;
CREATE TABLE users(
	name varchar(16) not null,
    phone varchar(11) not null,
    email varchar(32),
    age int not null,
    id varchar(32) not null primary key,
    pw varchar(16) not null,
    info varchar(512) default '',
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


-- Triger -- 

#유저 정보 생성시 Trigger
#이전 실행으로 이미 트리거 존재 할수 있으므로 REPLACE또한 추가

DELIMITER $$
CREATE trigger CHECK_USER_DATA
	BEFORE INSERT on users
    FOR EACH ROW
    BEGIN
		if new.id is null or "" then
			SIGNAL SQLSTATE '10001' SET MESSAGE_TEXT = "아이디는 필수 입니다.";
		elseif (NEW.id REGEXP '[A-za-z0-9]{5,15}') = 0 then
			SIGNAL SQLSTATE '10002' SET MESSAGE_TEXT = "아이디는 영문이나 숫자고 길이는 5~15자 입니다.";
		elseif new.pw is null or "" then
			SIGNAL SQLSTATE '10003' SET MESSAGE_TEXT = "패스워드는 필수 입니다.";
		elseif (NEW.pw REGEXP '(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,20}') = 0 then 
			SIGNAL SQLSTATE '10004' SET MESSAGE_TEXT = "비밀번호는 8~20자 최소 하나의 문자 및 하나의 숫자를 포함해야 합니다.";
		elseif new.name is null or "" then
			SIGNAL SQLSTATE '10005' SET MESSAGE_TEXT = "닉네임은 필수 입니다.";
		elseif (NEW.phone REGEXP '[0-9]{9,12}' ) = 0 then
			SIGNAL SQLSTATE '10006' SET MESSAGE_TEXT = "전화번호는 9~11자 입니다.";
		elseif (NEW.age REGEXP '[0-9]') = 0 then
			SIGNAL SQLSTATE '10007' SET MESSAGE_TEXT = "나이는 숫자만 입력해주세요.";
		elseif (NEW.age > 0 AND NEW.age < 150) = 0 then
			SIGNAL SQLSTATE '10008' SET MESSAGE_TEXT = "나이는 1 ~ 150 사이의 값만 입력 가능합니다.";
		end if;
	END $$
DELIMITER ;