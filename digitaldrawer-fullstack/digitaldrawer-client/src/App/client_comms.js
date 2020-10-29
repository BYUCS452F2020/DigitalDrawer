// Client-Server Communication
// Creates requests and handles responses
// Using server API
const READY_STATE_REQUEST_FINISHED = 4;

// TODO: dynamically find server
const SERVER = 'http://localhost:5000'


class ClientCommunicator {

    constructor(server_address) {
        this.token = null;
        this.server = server_address
        // TODO: add model to be able to pass in data
    }


    getDefault() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: PERFORM SOME ACTION
                } else if (this.status === 404) {
                    throw "ERROR: not found"
                }
            }
        }
        req.open("GET", this.server + "/");
        req.send();
    }

    postLogin(username, password) {
        var req = new XMLHttpRequest();
        var commsRef = this;
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: LOGIN
                    // if auth=true, get token
                    if (this.body.auth === true) {
                        commsRef.token = this.body.token;
                    }
                } else if (this.status === 401) {
                    throw "ERROR: login failed"
                } else if (this.status === 404) {
                    throw "ERROR: not found"
                }
            }
        }
        req.open("POST", this.server + "/users/login");
        var body = {username: username, password: password};
        req.send(JSON.stringify(body));
    }

    postRegister(username, password, firstname, lastname, email, type) {
        var req = new XMLHttpRequest();
        var commsRef = this;
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: REGISTER AND LOGIN
                    // if auth=true, get token
                    if (this.body.auth === true) {
                        commsRef.token = this.body.token;
                        // TODO: check if this sets global token
                    }
                } else if (this.status === 401) {
                    throw "ERROR: register failed"
                } else if (this.status === 404) {
                    throw "ERROR: URL not found"
                }
            }
        }
        req.open("POST", this.server + "/users/register");
        var body = {
            UserName: username,
            Password: password,
            FirstName: firstname,
            LastName: lastname,
            Email: email,
            Type: type
        };
        // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(JSON.stringify(body));

    }

    postCreateEntity(username, rating, frequency, url) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: Find out what to do when post entity works
                } else if (this.status === 401) {
                    throw "ERROR: unauthorized"
                } else if (this.status === 404) {
                    throw "ERROR: URL not found"
                }
            }
        }
        req.setRequestHeader('authorization', 'Bearer ' + this.token)
        req.open("POST", this.server + "/entity/create");
        var body = {UserName: username, Rating: rating, Frequency: frequency, Url: url};
        req.send(JSON.stringify(body));
    }

    deleteEntity(entityID) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: Find out what to do when delete entity works
                } else if (this.status === 401) {
                    throw "ERROR: unauthorized"
                } else if (this.status === 404) {
                    throw "ERROR: URL not found"
                }
            }
        }
        req.setRequestHeader('authorization', 'Bearer ' + this.token)
        req.open("POST", this.server + "/entity/delete/" + entityID);
        req.send();
    }

    // TODO: Does update entity need body and entityID?
    updateEntity() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: Find out what to do when update entity works
                } else if (this.status === 401) {
                    throw "ERROR: unauthorized"
                } else if (this.status === 404) {
                    throw "ERROR: URL not found"
                }
            }
        }
        req.setRequestHeader('authorization', 'Bearer ' + this.token)
        req.open("PATCH", this.server + "/entity/update");
        req.send();
    }


    getAllEntities() {
        var req = new XMLHttpRequest();
        var commsRef = this;
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: Find out where to put the data
                    var data = this.body
                } else if (this.status === 401) {
                    throw "ERROR: unauthorized"
                } else if (this.status === 404) {
                    throw "ERROR: URL not found"
                }
            }
        }
        req.setRequestHeader('authorization', 'Bearer ' + this.token)
        req.open("GET", this.server + "/entity/get");
        req.send();
    }

    getEntity(entityID) {
        var req = new XMLHttpRequest();
        var commsRef = this;
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: Find out where to put the data
                    var data = this.body
                } else if (this.status === 401) {
                    throw "ERROR: unauthorized"
                } else if (this.status === 404) {
                    throw "ERROR: URL not found"
                }
            }
        }
        req.setRequestHeader('authorization', 'Bearer ' + this.token)
        req.open("GET", this.server + "/entity/get/" + entityID);
        req.send();
    }
}
var comms = new ClientCommunicator(SERVER);
export default comms;
