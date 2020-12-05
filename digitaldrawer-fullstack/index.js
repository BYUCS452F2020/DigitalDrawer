const USE_NOSQL = true;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const pool = require("./db/index");
const aws = require ("aws-sdk");
const uuid = require("uuid");

if (USE_NOSQL) {
    aws.config.update({
        region: "local",
        endpoint: "http://localhost:8000"
    });
    var docClient = new aws.DynamoDB.DocumentClient();
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cors = require('cors');
app.use(cors());

const MESSAGE_UNAUTHORIZED = 'Unauthorized'
const jwtSecret = "JWT_SECRET";


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'digitaldrawer-client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.text());

app.post('/users/login', (req, res) => {
    var body = req.body
    if (typeof body === 'string')
        body = JSON.parse(req.body)
    const userName = body.UserName;
    const password = body.Password;
    if(!USE_NOSQL) {
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

                    if (!passwordIsValid)
                        return res.status(401).send({auth: false, token: null});

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
                                let token = jwt.sign({userName: userName, userID: userID}, jwtSecret, {
                                    // let token = jwt.sign( {id: name}, config.secret,{
                                    expiresIn: 86400 // expires in 24 hours
                                });

                                res.status(200).send({auth: true, token: token});
                            }
                        }
                    )


                }
            }
        )
    } else {
        // Get the password data
        let params = {
            TableName: "credentials",
            Key: {
                'UserName': userName
            }
        };
        docClient.get(params, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                if ("Item" in data) {
                    const hash = data.Item.PasswordHash;
                    // Check if password matches stored hash
                    let passwordIsValid = bcrypt.compareSync(password, hash);
                    if (!passwordIsValid) {
                        return res.status(401).send({auth: false, token: null});
                    }
                    // We did away with the userID, so we don't need to query users
                    let token = jwt.sign({userName: userName, userID: userName}, jwtSecret, {
                        // let token = jwt.sign( {id: name}, config.secret,{
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).send({auth: true, token: token});
                } else {
                    res.send("Invalid credentials");
                }
            }
        });
        

    }

    // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // if res == true, password matched
    // else wrong password
    // });
});

// let passwordIsValid = bcrypt.compareSync(password, results.rows[0].password);
//const payload = jwt.verify(jwtToken, process.env.jwtSecret);
//req.user = payload.user;

// app.options('/users/register', cors())
app.post('/users/register', async (req, res) => {
    console.log(req.body)
    var body = req.body
    if (typeof body === 'string')
        body = JSON.parse(req.body)
    const UserName = body.UserName;
    const Password = body.Password;
    const FirstName = body.FirstName;
    const LastName = body.LastName;
    const Email = body.Email;
    const Type = body.Type;


    console.log("Register POST Request received for: " + UserName);
    console.log({
        UserName,
        Password
    });

    const hashedPassword = await bcrypt.hash(Password, 12);
    if (!USE_NOSQL) {
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
    } else {
        // Check if username is already used
        let usernameTaken = true;
        let params = {
            TableName: "credentials",
            Key: {
                'UserName': UserName
            }
        };
        docClient.get(params, function(err, data) {
            if (err){
                res.status(500).send(err);
            } else {
                usernameTaken = ("Item" in data);
                // If not, put into users and credentials
                if (!usernameTaken) {
                    params = {
                        TableName: "users",
                        Item: {
                            UserName: UserName,
                            FirstName: FirstName,
                            LastName: LastName,
                            Email: Email,
                            Type: Type,
                            UrlIDs: []
                        }
                    };
                    docClient.put(params, function(err, data) {
                        if (err) 
                            res.status(500).send(err);
                        
                    });

                    params = {
                        TableName: "credentials",
                        Item: {
                            UserName: UserName,
                            PasswordHash: hashedPassword,
                            Salt: 12
                        }
                    };
                    docClient.put(params, function(err, data) {
                        if (err)
                            res.status(500).send(err);
                        else 
                            res.status(201).send();
                    });
                }

            }
        });

    }

});


/**
 *  expects
 *  Header
 *  authorization: Bearer <token>
 */
app.post('/entity/create', (req, res) => {
    let payload = verifyToken(req);
    if (!payload) {
        res.status(401).send(MESSAGE_UNAUTHORIZED)
    }

    var userID = payload.userID;
    let rating = req.body.Rating;
    // let frequency = req.body.Frequency;
    let url = req.body.Url;

    if (!USE_NOSQL) {
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
    } else {
        // We assume UserID = UserName
        // Put entity into entities
        let urlID = uuid.v4();
        let params = {
            TableName: "entity",
            Item: {
                UrlID: urlID,
                Url: url,
                Rating: rating,
                UserID: userID,
                Frequency: 1
            }
        };
        docClient.put(params, function(err, data) {
            if (err)
                res.status(500).send(err);
        });

        // Put a reference of the given entity into the corresponding user
        params = {
            TableName:  "users",
            Key:{
                UserName: userID
            },
            UpdateExpression: "set #ids = list_append(#ids, :id)",
            ExpressionAttributeNames: {
                "#ids": "UrlIDs"
            },
            ExpressionAttributeValues: {
                ":id": [urlID]
            }
        }
        docClient.update(params, function(err, data) {
            if (err)
                res.status(500).send(err);
            else 
                res.status(201).send();
        });
    }
});

app.get('/entity', (req, res) => {
    let payload = verifyToken(req);
    if (!payload) {
        res.status(401).send(MESSAGE_UNAUTHORIZED)
    }

    var userID = payload.userID;

    if (!USE_NOSQL) {
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
    } else {
        // Get entities UrlID list from users
        let params = {
            TableName: "users",
            Key: {
                UserName: userID
            }
        }
        docClient.get(params, function(err, data) {
            if (err)
                res.status(500).send(err);
            else {
                if ("Item" in data) {
                    let UrlIDs = data.Item.UrlIDs;
                    // for each id, get the user
                    Keys = []
                    for (let i = 0; i < UrlIDs.length; i++) {
                        Keys.push({UrlID: UrlIDs[i]});
                    }
                    params = {
                        RequestItems: {
                            entity: {
                                Keys: Keys
                            }
                        }
                    }
                    docClient.batchGet(params, function(err, data) {
                        if (err)
                            res.status(500).send(err);
                        else {
                            // TODO: Find out what batchGet data looks like
                            res.status(200).send(data)
                        }
                    })
                } else {
                    res.status(400).send("User not found");
                }
            }
        })
    }

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
    if (!payload) {
        res.status(401).send(MESSAGE_UNAUTHORIZED)
    }

    var userID = payload.userID;
    var urlID = req.params.id;

    if (!USE_NOSQL) {
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

                if (results.rowCount > 0) {
                    res.status(200).send(results.rowCount + " row(s) deleted");
                } else {
                    res.status(400).send("nothing was deleted")
                }

            }
        )
    } else {
        let params = {
            TableName: "entity",
            Key: {UrlID: urlID}
        }
        docClient.delete(params, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                // TODO: delete from users too

                // Start by getting the users data
                params = {
                    TableName: "users",
                    Key: {UserName: userID}
                };
                docClient.get(params, function(err, data) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        if ("Item" in data && "UrlIDs" in data.Item) {
                            // Delete key from UrlIDs
                            let ids = data.Item.UrlIDs;
                            let idx = ids.indexOf(urlID);
                            if (idx > -1) {
                                ids.splice(idx,1)
                            };
                            
                            // Replace UrlIDs with new UrlIDs
                            params = {
                                TableName: "users",
                                Key: {
                                    UserName: userID
                                },
                                UpdateExpression: "set #ids = :newid",
                                ExpressionAttributeNames: {
                                    "#ids": "UrlIDs"
                                },
                                ExpressionAttributeValues: {
                                    ":newid": ids
                                }
                            }
                            docClient.update(params, function(err, data) {
                                if (err)
                                    res.status(500).send(err);
                                else
                                    res.status(200).send("Deleted entity");
                            });
                        }else{
                            console.log(data)
                        }
                    }
                });
            }
        });
    }
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
    if (!payload) {
        res.status(401).send('unauthorized')
    }

    var userID = payload.userID;
    var urlID = req.params.id;

    if (!USE_NOSQL) {
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
    } else {
        let params = {
            TableName: "entity",
            Key: {
                'UrlID': urlID
            }
        };
        docClient.get(params, function(err, data) {
            if (err)
                res.status(500).send(err);
            else {
                if ("Item" in data) {
                    if (data.Item.UserID === userID) {
                        res.status(200).send(data.Item);
                    } else {
                        res.status(400).send("Entity not found")
                    }
                } else {
                    res.status(400).send("Entity not found")
                }
            }
        });
    }
})

function verifyToken(req) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // Express headers are auto converted to lowercase
    if (!token) {
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


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`));
