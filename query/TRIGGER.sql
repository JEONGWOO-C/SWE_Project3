use market_db;

#유저 정보 생성시 Trigger
#이전 실행으로 이미 트리거 존재 할수 있으므로 REPLACE또한 추가

DELIMITER $$
CREATE trigger CHECK_USER_DATA
	BEFORE INSERT on users
    FOR EACH ROW
    BEGIN
		if new.id is null or "" then
			SIGNAL SQLSTATE '10001';
			SET MESSAGE_TEXT = "아이디는 필수 입니다.";
		elseif (NEW.id REGEXP '[A-za-z0-9]{5,15}') = 0 then
			SIGNAL SQLSTATE '10002';
			SET MESSAGE_TEXT = "아이디는 영문이나 숫자고 길이는 5~15자 입니다.";
		elseif new.pw is null or "" then
			SIGNAL SQLSTATE '10003';
			SET MESSAGE_TEXT = "패스워드는 필수 입니다.";
		elseif (NEW.pw REGEXP '(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,20}') = 0 then 
			SIGNAL SQLSTATE '10004';
			SET MESSAGE_TEXT = "패스워드는 필수 입니다.";
		elseif new.name is null or "" then
			SIGNAL SQLSTATE '10005';
			SET MESSAGE_TEXT = "비밀번호는 8~20자 최소 하나의 문자 및 하나의 숫자를 포함해야 합니다.";
		elseif (NEW.phone REGEXP '[0-9]{9,12}' ) = 0 then
			SIGNAL SQLSTATE '10006';
			SET MESSAGE_TEXT = "전화번호는 9~11자 입니다.";
		end if;
	END $$
DELIMITER ;