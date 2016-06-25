
-- Search and replace XXX with yourUserName before running this script. Also
-- you'll need to make the corresponding change in PersonDAO.java.

DROP TABLE XXX_angularcrud cascade constraints;
CREATE TABLE XXX_angularcrud (
    id           number(10)    Primary Key,
    firstName    varchar2(255) Not Null,
    lastName     varchar2(255) Not Null,
    addressType  varchar2(255),
    street       varchar2(255),
    city         varchar2(255),
    state        char(2),
    zip          char(5),
    phoneType    char(10),
    phone        char(10),
    email        varchar2(255),
    website      varchar2(255)
);

DROP SEQUENCE XXX_angularcrud_seq;
CREATE SEQUENCE XXX_angularcrud_seq
    MINVALUE 1
    MAXVALUE 999999999999999999999999999
    START WITH 1
    INCREMENT BY 1
    CACHE 20;

-- Someday, maybe in the near future, I'm going to move the
-- address(s) and phone(s) to their own tables. This will allow
-- having multiple addresses and phone numbers for a person.
--
-- DROP TABLE XXX_angularcrud_address cascade constraints;
-- CREATE TABLE XXX_angularcrud_address (
--     id           number(10)    Primary Key,
--     personId     number(10),
--     addressType  varchar2(255),
--     street       varchar2(255),
--     city         varchar2(255),
--     state        char(2),
--     zip          char(5)
-- );
--
-- DROP TABLE XXX_angularcrud_phone cascade constraints;
-- CREATE TABLE XXX_angularcrud_phone (
--     id           number(10)    Primary Key,
--     personId     number(10),
--     phoneType    char(10),
--     phone        char(10)
-- );
