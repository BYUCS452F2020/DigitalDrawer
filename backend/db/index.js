require("dotenv").config();

const Pool = require("pg").Pool;

const pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    }
);


module.exports = pool;
// const isProduction = process.env.NODE_ENV === "production";
//
// const connectionStr = `postgrresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
//
// const pool = new Pool({
//     connectionStr: isProduction ? process.env.DATABASE_URL : connectionStr
// })
//
// console.log("Connection string\n" + connectionStr);
// module.exports = { pool };