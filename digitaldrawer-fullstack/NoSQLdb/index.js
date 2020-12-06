// Create the DynamoDB tables
const AWS = require("aws-sdk");
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000"
});
var dynamodb = new AWS.DynamoDB();
var tables = [{name:"users", id:"UserName", type:"S"},{name:"entity", id:"UrlID", type:"N"},
  {name:"payment", id:"PaymentID", type:"N"},{name:"credentials", id:"UserName", type:"S"},];
for (let i = 0; i < tables.length; i++) {
  let name = tables[i].name
  let id = tables[i].id
  let type = tables[i].type
  let params = {
    TableName : name,
    KeySchema: [
      {AttributeName: id, KeyType: "HASH"}, // Partition key
    ],
    AttributeDefinitions: [
      {AttributeName: id, AttributeType: type},
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };
  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.error("Error: ", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table.", JSON.stringify(data, null, 2));
    }
  });
}


/*
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
*/