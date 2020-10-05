const express = require('express');
const app = express();

const pool = require("./db/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/test', async (req, res) => {
    try {
        const newT = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            ["test2", "test2"]);

        res.json(newT);

    } catch (err) {
        console.log(err);
    }


});

var num = 0

app.post('/users/login', (req, res) => {
    const name = req.body.username;
    const password = req.body.password;
    pool.query(
        `SELECT *
             FROM users
             WHERE username = $1`,
        [name],
        (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length !== 1) {
                res.send("Invalid credentials")
            } else {
                let passwordIsValid = bcrypt.compareSync(password, results.rows[0].password);

                if(!passwordIsValid)
                    return res.status(401).send( {auth:false, token:null});
                const secret = "JWT_SECRET"
                let token = jwt.sign( {id: name}, secret,{
                    // let token = jwt.sign( {id: name}, config.secret,{
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({ auth: true, token: token});
            }
        }
    )

    // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // if res == true, password matched
    // else wrong password
    // });
});

//const payload = jwt.verify(jwtToken, process.env.jwtSecret);
//req.user = payload.user;

app.get('/users/register', async (req, res) => {
    var t0 = performance.now()

    let name = 'name' + num++;
    let password = 'password';

    console.log({
        name,
        password
    });

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("check");
    pool.query(
        `SELECT *
             FROM users
             WHERE username = $1`,
        [name],
        (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length > 0) {
                res.send("username already registered")
            } else {
                console.log("insert");
                pool.query(
                    `INSERT INTO users (username, password)
                         VALUES ($1, $2)
                         RETURNING id, password`,
                    [name, hashedPassword],
                    (err, results) => {
                        if (err) {
                            throw err
                        }
                        console.log("returning");
                        res.send(results.rows);
                    }
                )
            }
        }
    )

});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
