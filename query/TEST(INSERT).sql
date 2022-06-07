USE market_db;

INSERT users(name, phone, email, age, id, pw)
VALUES
('임경택', '01011111111', 'tester1@market.com', 45, 'test1', '1111' ),
('조정우', '01022222222', 'tester2@market.com', 34, 'test2', '2222' ),
('이민석', '01033333333', 'tester3@market.com', 23, 'test3', '3333' ),
('이세연', '01044444444', 'tester4@market.com', 12, 'test4', '4444' );

INSERT posts(title, postDate, views)
VALUES
('아이폰1', '2022-06-07 16:00:00', 10),
('아이폰2', '2022-06-07 16:00:01', 11),
('아이폰3', '2022-06-07 16:00:02', 12),
('아이폰4', '2022-06-07 16:00:03', 13),
('아이폰5', '2022-06-07 16:00:04', 1),
('아이폰6', '2022-06-07 16:00:05', 2),
('아이폰7', '2022-06-07 16:00:06', 3),
('아이폰8', '2022-06-07 16:00:07', 4),
('아이폰9', '2022-06-07 16:00:08', 5),
('아이폰10', '2022-06-07 16:00:09', 6),
('아이폰11', '2022-06-07 16:00:10', 7),
('아이폰12', '2022-06-07 16:00:11', 8),
('아이폰13', '2022-06-07 16:00:12', 9);


INSERT product(postnum, price, category, descript, seller_id)
VALUES
(1, 100000, 'phone', 'iphone #1', 'test1'),
(2, 200000, 'phone', 'iphone #2', 'test1'),
(3, 300000, 'phone', 'iphone #3', 'test1'),
(4, 400000, 'phone', 'iphone #4', 'test1'),
(5, 500000, 'phone', 'iphone #5', 'test1'),
(6, 600000, 'phone', 'iphone #6', 'test1'),
(7, 700000, 'phone', 'iphone #7', 'test1'),
(8, 800000, 'phone', 'iphone #8', 'test1'),
(9, 900000, 'phone', 'iphone #9', 'test1'),
(10, 1000000, 'phone', 'iphone #10', 'test1'),
(11, 1100000, 'phone', 'iphone #11', 'test1'),
(12, 1200000, 'phone', 'iphone #12', 'test1'),
(13, 1300000, 'phone', 'iphone #13', 'test1');

INSERT photos(postnum, imgnum, photo)
VALUES
(1, 1, 'null'),
(2, 1, 'null'),
(3, 1, 'null'),
(4, 1, 'null'),
(5, 1, 'null'),
(6, 1, 'null'),
(7, 1, 'null'),
(8, 1, 'null'),
(9, 1, 'null'),
(10, 1, 'null'),
(11, 1, 'null'),
(12, 1, 'null'),
(13, 1, 'null');