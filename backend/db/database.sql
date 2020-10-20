CREATE DATABASE digitaldrawer;

--c\ into digitaldrawer

CREATE TABLE IF NOT EXISTS users(
    UserID SERIAL PRIMARY KEY,
    UserName varchar(255) UNIQUE,
    FirstName varchar(255),
    LastName varchar(255),
    Email varchar(255),
    Type varchar(50)
);

CREATE TABLE IF NOT EXISTS entity(
    UrlID SERIAL PRIMARY KEY,
    UserID integer REFERENCES users (UserID) ON DELETE CASCADE,
    Rating integer,
    Frequency integer,
    Url varchar(1000)
);

CREATE TABLE IF NOT EXISTS payment(
    PaymentID SERIAL PRIMARY KEY,
    UserID integer REFERENCES users (UserID) ON DELETE CASCADE,
    PayType integer,
    CardID integer
);

CREATE TABLE IF NOT EXISTS credentials(
    UserName varchar(255) PRIMARY KEY REFERENCES users(UserName) ON DELETE CASCADE,
    PasswordHash varchar(255),
    Salt integer
);



