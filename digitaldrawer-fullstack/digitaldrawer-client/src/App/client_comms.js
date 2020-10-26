// Client-Server Communication
// Creates requests and handles responses
// Using server API
const READY_STATE_REQUEST_FINISHED = 4;

class ClientCommunicator {

    constructor() {
        this.token = null;
        // TODO: add model to be able to pass in data
    }

    getDefault(server) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: PERFORM SOME ACTION
                } else if (this.status === 404) {
                    // TODO: SERVER NOT FOUND ERROR MESSAGE
                }
            }
        }
        req.open("GET", server + "/");
        req.send();
    }

    postLogin(server, username, password) {
        var req = new XMLHttpRequest();
        var commsRef = this;
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: LOGIN
                    // if auth=true, get token
                    if (this.body.auth == true) {
                        commsRef.token = this.body.token;
                    }
                } else if (this.status === 401) {
                    throw "ERROR: login failed"
                } else if (this.status === 404) {
                    throw "ERROR: URL not found"
                }
            }
        }
        req.open("POST", server + "/login");
        var body = {username: username, password: password};
        req.send(body);
    }

    postRegister(server, username, password, firstname, lastname, email, type) {
        var req = new XMLHttpRequest();
        var commsRef = this;
        req.onreadystatechange = function () {
            if (this.readyState === READY_STATE_REQUEST_FINISHED) {
                if (this.status === 200) {
                    // TODO: REGISTER AND LOGIN
                    // if auth=true, get token
                    if (this.body.auth == true) {
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
        req.open("POST", server + "/register");
        var body = {
            UserName: username,
            Password: password,
            FirstName: firstname,
            LastName: lastname,
            Email: email,
            Type: type
        };
        req.send(body);
    }

    postCreateEntity(server, username, rating, frequency, url) {
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
        req.open("POST", server + "/entity/create");
        var body = {UserName: username, Rating: rating, Frequency: frequency, Url: url};
        req.send(body);
    }

    deleteEntity(server, entityID) {
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
        req.open("POST", server + "/entity/delete/" + entityID);
        req.send();
    }

    // TODO: Does update entity need body and entityID?
    updateEntity(server) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (this.readyState == READY_STATE_REQUEST_FINISHED) {
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
        req.open("PATCH", server + "/entity/update");
        req.send();
    }


    getAllEntities(server) {
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
        req.open("GET", server + "/entity/get");
        req.send();
    }

    getEntity(server, entityID) {
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
        req.open("GET", server + "/entity/get/" + entityID);
        req.send();
    }
}
