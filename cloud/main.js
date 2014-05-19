var pingdom = require('pingdom-api');
var async = require('async');

var accounts = require('data-test_accounts.json').accounts;
var users = require('data-users.json').users;
var permissions = require('data-permissions.json').permissions;
console.log("PINGDOM_ACCOUNTS=", accounts);
console.log("USERS=", users);
console.log("PERMISSIONS=", permissions);



exports.getAccounts = function(params, callback) {

    console.log("Coookie passed  1 ", params.cookie);
    var accountsToUse = [];
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        console.log("USER=", user);
        if (users[i].user === params.cookie) {
            user_accounts = permissions[users[i].user];
            if (user_accounts.length != 0) {
                console.log("USER_ACCOUNTS_____F", user_accounts);
                for (var n = 0; n < user_accounts.length; n++) {
                    user_account = user_accounts[n];
                    console.log("USER_ACCOUNT=", user_account);
                    for (var m = 0; m < accounts.length; m++) {
                        pingdom_account = accounts[m];
                        console.log("PINGDOM_ACCOUNT", pingdom_account);
                        if (user_account === pingdom_account.id) {
                            accountsToUse.push(pingdom_account);
                        };
                    };
                };
            } else {
 
                return callback({
                    status: "not ok",
                    msg: "No accounts for this user",
                    success: false
                }, null);
            }
            console.log("  === equal ");
        }
    }

    return _getRequestsReady(accountsToUse, callback);
}

function _getRequestsReady(params, callback) {
    //The below loops over the creds specified in the data.json
    //Using async it builds a queue of requests that need to be sent

    var queue = [];
    //console.log(params);
    var accounts = params;
    // console.log("users[] ", accounts);
    for (var i = 0; i < accounts.length; i++) {
        //      var acCredentials = {
        //  user: accounts[i]['username'],
        //  pass: accounts[i]['password'],
        //  appkey: accounts[i]['appkey']
        // };
        queue.push(async.apply(_sendRequests, accounts[i]));
    }
    //Use Async to call _sendRequest function in series
    // It passes in the creds for each request and handles callback
    async.parallel(queue, function(err, ful) {
        //Handle Error Correctly
        if (err) {
            return callback(err, null);
        }

        console.log(JSON.stringify(ful, null, 2));
        //Return callback to client (App)
        return callback(null, {
            cloudRes: ful
        });
    });

};

// This function sends the request to get checks from pindom
// It uses a pingdom node module
// api variable needs to be reinstated each time 
// as the creds change per request.
// It does no logic but send the request and return the results

function _sendRequests(pingdomCreds, callback) {
    var api = pingdom(pingdomCreds);

    api.checks(function(err, checks) {
        if (err) return callback(err, null);

        var res = {
            "id": pingdomCreds.id,
            "name": pingdomCreds.name,
            "numChecks": checks.length,
            "checksUp": 0,
            "checksDown": 0,
            "checksPaused": 0,
            "checksUnknown": 0
        }
        for (var c = checks.length - 1; c >= 0; c--) {
            var check = checks[c];
            if (check.status == "up") res.checksUp++;
            else if (check.status == "down") res.checksDown++;
            else if (check.status == "paused") res.checksPaused++;
            else res.checksUnknown++;
        }
        return callback(null, res);
    });
};

exports.execLogin = function(params, callback) {

    var username = params.username;
    var password = params.password;
    console.log(username, password);

    for (var i = 0; i < users.length; i++) {
        var usersUsername = users[i].user;
        var usersPassword = users[i].pass;
        console.log(usersUsername, usersPassword);
        if (usersUsername === username) {
            console.log('Usernames Match');
            if (usersPassword === password) {
                console.log('Password Match');
                return callback(null, {
                    status: "ok",
                    msg: "Login Success.",
                    success: true,
                    userId: usersUsername
                });
            } else {
                console.log('Password Not Match');
                return callback(null, {
                    status: "not ok",
                    msg: "Invalid Credentials",
                    success: false
                });
            }
        }
    };
    console.log('No Usernames Match??');
    return callback(null, {
        status: "not ok",
        msg: "Invalid Credentials",
        success: false
    });
    //Get UserName and password
    //Search DB ($fh.db (eq))
    //Check if user exsists. (Is search null?)
    // Check passwords (to be hashed by the end)
    // If match return sucess
    // else return login error
};

exports.getChecks = function(params, callback) {
    return _sendChecksRequest(params, callback);
};

function _sendChecksRequest(params, callback) {
    var id = params.checkId;

    var correctCreds = "";

    console.log("Coookie passed 2 " + params.cookie);
    console.log("ID ", id);
    /////////
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        console.log("USER=", user);
        if (users[i].user === params.cookie) {
            user_accounts = permissions[users[i].user];
            //console.log("USER_ACCOUNTS", user_accounts);
            for (var n = 0; n < user_accounts.length; n++) {
                user_account = user_accounts[n];
                console.log("USER_ACCOUNT=", user_account);
                for (var m = 0; m < accounts.length; m++) {
                    pingdom_account = accounts[m];
                    console.log("PINGDOM_ACCOUNT", pingdom_account);
                    if (id === pingdom_account.id) {
                        //accountsToUse.push(pingdom_account);
                        correctCreds = accounts[m];
                    };
                };
            };
            console.log("  === equal ");
        }
    }

    console.log(correctCreds);
    if (correctCreds === "") {
        return callback({
            status: 'not ok',
            msg: 'User doesnt exist!'
        }, null);
    }

    _sendToCheckRequests(correctCreds, function(err, ful) {
        //Handle Error Correctly
        if (err) {
            return callback(err, null);
        }
        console.log(JSON.stringify(ful, null, 2));
        return callback(null, {
            cloudRes: ful,
            success: true,
            allChecks: ful.length,
            upChecks: ful.checksUp,
            downChecks: ful.checksDown,
            pausedChecks: ful.checksPaused
        });
    });
};

function _sendToCheckRequests(pingdomCreds, callback) {
    var api = pingdom(pingdomCreds);

    api.checks(function(err, checks) {
        if (err) return callback(err, null);
        var allChecks = checks.length;
        var checksUp = 0;
        var checksDown = 0;
        var checksPaused = 0;

        for (var c = checks.length - 1; c >= 0; c--) {
            var check = checks[c];
            if (check.status == "up") checksUp++;
            else if (check.status == "down") checksDown++;
            else checksPaused++;
        }
        checks['allChecks'] = allChecks;
        checks['checksUp'] = checksUp;
        checks['checksDown'] = checksDown;
        checks['checksPaused'] = checksPaused;
        console.log("CCCCCCChecksDown", checksUp);
        console.log(" checks['checksPaused']", checks);
        return callback(null, checks);
    });
};

exports.execCreate = function(params, callback) {
    $fh.db({
        "act": "create",
        "type": "myUser",
        "fields": params.dbData
    }, function(err, data) {
        if (err) {
            console.log("Error " + err)
            return callback(err, null);
        } else {
            console.log(JSON.stringify(data))
            return callback(null, {
                status: "ok",
                success: true
            });
        }

    });
}; 
/*
 @param params.to : recipient
 @param params.subject : email subjecrt
 @param params.body : message body
 */
exports.mailer = function(params, cb) {
    var nodemailer = require("nodemailer");

    var smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "dumitru.brinza@feedhenry.com",
            pass: "Paravoz82"
        }
    });
    var mailOptions = {
        from: params.emailReq, // sender address
        to: "dimabrinza@gmail.com", // list of receivers
        subject: " Multi-Pingdom App Account Request from -> " + params.emailReq , // Subject line
        text: params.message // plaintext body 
    };
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            return cb(error, null);
        } else {
            console.log("Message sent: " + response.message);
           //console.log("Message sent2: " + response);
            return cb(null, {
                success: true,
                msg: response.message
            });
        }
    });
};

// --------------------------------------------------------------------------------------



