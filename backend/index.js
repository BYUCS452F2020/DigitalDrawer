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
        const newT = await pool.query("INSERT INTO users (username) VALUES ($1) RETURNING *",
            ["test2"]);

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

app.post('/users/register', async (req, res) => {
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const Type = req.body.Type;

    console.log({
        UserName,
        Password
    });

    const hashedPassword = await bcrypt.hash(Password, 12);

    console.log("check");
    pool.query(
        `SELECT *
             FROM users
             WHERE UserName = $1`,
        [UserName],
        (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length > 0) {
                res.send("username already registered")
            } else {
                console.log("insert");
                pool.query(
                    `INSERT INTO users (UserName, FirstName, LastName, Email, Type)
                         VALUES ($1, $2, $3, $4, $5)
                         RETURNING UserID, UserName`,
                    [UserName, FirstName, LastName, Email, Type],
                    (err, results) => {
                        if (err) {
                            throw err
                        }
                        // console.log("returning");
                        console.log(results.rows);
                        res.send(results.rows);
                        pool.query(
                            `INSERT INTO credentials (UserName, PasswordHash, Salt)
                         VALUES ($1, $2, $3)
                         RETURNING UserName, PasswordHash`,
                            [UserName, hashedPassword, 12],
                            (err, results) => {
                                if (err) {
                                    throw err
                                }
                                // console.log("returning");
                                console.log(results.rows);
                                res.send(results.rows);
                            }
                        )
                    }
                )


            }
        }
    )

});


/**
 *  expects
 *  Header
 *  authorization: Bearer <token>
 */
app.post('/entity/create', (req, res) => {
    verified = verifyToken(req);
    if(!verified){
        res.status(401).send('unauthorized')
    }

    const UserName = req.body.UserName;
    let Rating = req.body.Rating;
    let Frequency = req.body.Frequency;
    let Url = req.body.Url;

    pool.query(
        `SELECT *
             FROM users
             WHERE UserName = $1`,
        [UserName],
        (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length > 0) {
                // UserID = results.rows[0].UserID
                const UserID = 1;
                pool.query(
                    `INSERT INTO entity (userid, rating, frequency, url)
                         VALUES ($1, $2, $3, $4)
                         RETURNING userid, urlid`,
                    [UserID, Rating, Frequency, Url],
                    (err, results) => {
                        if (err) {
                            throw err
                        }
                        // console.log("returning");
                        console.log(results.rows);
                        res.send(results.rows);
                    }
                )
            } else {
                console.log("insert");
            }
        }
    )
});


function verifyToken(req){
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // Express headers are auto converted to lowercase
    if(!token){
        return false;
    }

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length).trimLeft();
    }
    if (token) {

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return false;
                // return res.json({
                //     success: false,
                //     message: 'Token is not valid'
                // });
            } else {
                return true;
                // req.decoded = decoded;
                // next();
            }
        });
    }

    return false;
}


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
