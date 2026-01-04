-- Meetup 테이블 생성 스크립트 (Oracle)
-- 이 스크립트를 Oracle SQL Developer 또는 SQL*Plus에서 실행하세요.

-- 시퀀스가 이미 존재하면 삭제
BEGIN
   EXECUTE IMMEDIATE 'DROP SEQUENCE meetup_seq';
EXCEPTION
   WHEN OTHERS THEN NULL;
END;
/

-- 테이블이 이미 존재하면 삭제
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE meetups';
EXCEPTION
   WHEN OTHERS THEN NULL;
END;
/

-- 시퀀스 생성
CREATE SEQUENCE meetup_seq START WITH 1 INCREMENT BY 1;

-- 테이블 생성
CREATE TABLE meetups (
    id NUMBER PRIMARY KEY,
    title VARCHAR2(255) NOT NULL,
    description VARCHAR2(500),
    location VARCHAR2(255),
    meet_date VARCHAR2(255),
    members NUMBER DEFAULT 0,
    max_members NUMBER DEFAULT 0,
    cost VARCHAR2(255),
    transport VARCHAR2(255),
    start_time VARCHAR2(50),
    end_time VARCHAR2(50),
    image VARCHAR2(255),
    tags VARCHAR2(255),
    supplies VARCHAR2(255),
    category VARCHAR2(50) NOT NULL
);

-- 완료 메시지
SELECT 'meetups 테이블 생성 완료!' AS result FROM dual;
