var fs = require('fs');
var accounts = require('./accounts.js');

function updateData(user, pass, data, callback) {
    accounts.verifyAccount(user, pass, function(err, verified) {
        if(err) {
            callback(err);
        }
        else {
            if(!verified) {
                callback(null, verified);
            }
            else {
                fs.writeFile('./data/data.txt', JSON.stringify(data), function(err) {
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null, true);
                    }
                });
            }
        }
    })
}

function getData(callback) {
    fs.readFile('./data/data.txt', function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, JSON.parse(data));
        }
    });
}

module.exports = {
    getData: getData,
    updateData: updateData
}
