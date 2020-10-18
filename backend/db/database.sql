CREATE DATABASE digitaldrawer;

--c\ into digitaldrawer

CREATE TABLE IF NOT EXISTS users(
    UserID SERIAL PRIMARY KEY,
    UserName varchar(255) UNIQUE REFERENCES credentials(UserName),
    FirstName varchar(255),
    LastName varchar(255),
    Email varchar(255).
    Type varchar(50)
)

CREATE TABE IF NOT EXISTS entity(
    UrlID SERIAL PRIMARY KEY,
    UserID integer REFERENCES users (userID)
    Rating integer
    Frequency integer
    Url varchar(1000)
);

CREATE TABE IF NOT EXISTS payment(
    PaymentID SERIAL PRIMARY KEY,
    UserID integer REFERENCES users (userID)
    PayType integer
    CardID integer
);


CREATE TABE IF NOT EXISTS credentials(
    UserName varchar(255) PRIMARY KEY,
    PasswordHash varchar(255),
    Salt integer
);



