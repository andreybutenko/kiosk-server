var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');

function verifyAccount(user, pass, callback) {
    fs.readFile('./data/accounts.txt', function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            var accounts = JSON.parse(data).accounts;
            var found = false;

            for(var i = 0; i < accounts.length; i++) {
                if(accounts[i].user == user) {
                    found = i;
                }
            }

            if(found === false) {
                callback(null, false);
            }
            else {
                bcrypt.compare(pass, accounts[found].pass, function(err, res) {
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null, res);
                    }
                });
            }
        }
    });
}

function createAccount(user, pass, newUser, newPass, callback) {
    verifyAccount(user, pass, function(err, res) {
        if(err) {
            callback(err);
        }
        else {
            if(res == false) {
                callback(null, false);
            }
            else {
                fs.readFile('./data/accounts.txt', function (err, data) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        var accounts = JSON.parse(data);
                        bcrypt.hash(newPass, null, null, function(err, hash) {
                            if (err) {
                                callback(err);
                            }
                            else {
                                accounts.accounts.push({
                                    user: newUser,
                                    pass: hash
                                });
                                fs.writeFile('./data/accounts.txt', JSON.stringify(accounts), function(err) {
                                    if(err) {
                                        callback(err);
                                    }
                                    else {
                                        callback(null, true);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}

module.exports = {
    verifyAccount: verifyAccount,
    createAccount: createAccount
}
