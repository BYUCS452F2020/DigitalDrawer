const express = require('express');
const app = express();

const pool = require("./db/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MESSAGE_UNAUTHORIZED = 'Unauthorized'
const jwtSecret = "JWT_SECRET";

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/users/login', (req, res) => {
    const userName = req.body.UserName;
    const password = req.body.Password;
    pool.query(
            `SELECT PasswordHash
             FROM CREDENTIALS
             WHERE userName = $1`,
        [userName],
        (err, results) => {
            if (err) {
                throw err;
            }

            if (results.rows.length !== 1) {
                res.send("Invalid credentials")
            } else {
                const hash = results.rows[0].passwordhash
                let passwordIsValid = bcrypt.compareSync(password, hash);

                if(!passwordIsValid)
                    return res.status(401).send( {auth:false, token:null});

                pool.query(
                    `SELECT userid
                    FROM users
                    WHERE username = $1`,
                    [userName],
                    (err, user_results) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        console.log(user_results.rows);
                        if (user_results.rows.length > 0) {
                            const userID = user_results.rows[0].userid;
                            let token = jwt.sign( {userName: userName, userID: userID}, jwtSecret,{
                                // let token = jwt.sign( {id: name}, config.secret,{
                                expiresIn: 86400 // expires in 24 hours
                            });

                            res.status(200).send({ auth: true, token: token});
                        }
                    }
                )


            }
        }
    )

    // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // if res == true, password matched
    // else wrong password
    // });
});

// let passwordIsValid = bcrypt.compareSync(password, results.rows[0].password);
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
                res.status(400).send("username already registered")
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
                        //res.send(results.rows);
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
                                res.status(201).send(results.rows);
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
    let payload = verifyToken(req);
    if(!payload){
        res.status(401).send(MESSAGE_UNAUTHORIZED)
    }

    var userID = payload.userID;
    let rating = req.body.Rating;
    // let frequency = req.body.Frequency;
    let url = req.body.Url;

    pool.query(
            `INSERT INTO entity (userid, rating, frequency, url)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
        [userID, rating, 0, url],
        (err, results) => {
            if (err) {
                throw err
            }
            // console.log("returning");
            console.log(results.rows);
            res.status(201).send(results.rows);
        }
    )
});

app.get('/entity', (req, res) => {
    let payload = verifyToken(req);
    if(!payload){
        res.status(401).send(MESSAGE_UNAUTHORIZED)
    }

    var userID = payload.userID;

    pool.query(
            `SELECT *
             FROM entity
             WHERE userid = $1`,
        [userID],
        (err, results) => {
            if (err) {
                res.status(500).send(err);
            }
            // console.log("returning");
            console.log(results.rows);
            res.status(200).send(results.rows);
        }
    )
    
})

app.delete('/users/:userId', (req, res) => {
    // const userIndex = getUserIndex(req.params.userId)
    //if (userIndex === -1) return res.status(404).json({})

    //users.splice(userIndex, 1)
    res.send("hi");
    //res.json(users)
})

app.delete('/entity/:id', function (req, res) {
    let payload = verifyToken(req)
    if(!payload){
        res.status(401).send(MESSAGE_UNAUTHORIZED)
    }

    var userID = payload.userID;
    var urlID = req.params.id;

    pool.query(
        `DELETE
            FROM entity
            WHERE urlid = $1 AND userid = $2`,
        [urlID, userID],
        (err, results) => {
            if (err) {
                res.status(500).send(err);
            }
            console.log(results.rowCount);

            if(results.rowCount > 0){
                res.status(200).send(results.rowCount + " row(s) deleted");
            }
            else{
                res.status(400).send("nothing was deleted")
            }

        }
    )
})

// app.put('/entity/:id', (req, res) => {
//     let payload = verifyToken(req);
//     if(!payload){
//         res.status(401).send('unauthorized')
//     }
//
//     var userID = payload.userID;
//     var urlID = req.params.id;
//
//
//     var rating = req.body.Rating;
//     var frequency = req.body.Frequency;
//     var url = req.body.Url;
//
//     var info = {}
//
//     if(rating)
//         info['rating'] = rating
//     if(frequency)
//         info['frequency'] = frequency
//     if(url)
//         info['url'] = url
//
//     pool.query(
//         `UPDATE entity
//         SET url = $1
//         WHERE urlid = $2 `,
//         [urlID, userID],
//         (err, entity_results) => {
//             if (err) {
//                 res.status(500).send(err);
//             }
//             console.log(entity_results.rows);
//             if (entity_results.rows.length > 0) {
//                 res.status(200).send(entity_results.rows);
//             }
//         }
//     )
// })

app.get('/entity/:id', (req, res) => {
    let payload = verifyToken(req);
    if(!payload){
        res.status(401).send('unauthorized')
    }

    var userID = payload.userID;
    var urlID = req.params.id;

    pool.query(
        `SELECT *
        FROM entity
        WHERE urlid = $1 AND userid = $2`,
        [urlID, userID],
        (err, entity_results) => {
            if (err) {
                res.status(500).send(err);
            }
            console.log(entity_results.rows);
            if (entity_results.rows.length > 0) {
                res.status(200).send(entity_results.rows);
            }
        }
    )
})

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
        return jwt.verify(token, process.env.jwtSecret || jwtSecret);
    }

    return false;
}


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
