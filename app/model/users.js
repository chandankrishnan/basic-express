// User Model
var mongo = require('mongoose'),
    mongoose = require('./db'),
    util = require("util"),
    EventEmitter = require("events").EventEmitter,
    conn = require('../database/userSchema');

//constructor
function UserList() {
    EventEmitter.call(this);
}

util.inherits(UserList, EventEmitter);

//Get all users
UserList.prototype.all = function(cb) {
    return conn.User.find({}, function(err, data) {
        if (err) {
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
};

UserList.prototype.save = function(userData, cb) {
    var self = this,
        user = new User(userData);

    conn.user.save(function(error, data) {
        if (error) {
            return cb(error, null)
        }
        self.emit('user-saved', userData);
        return cb(null, data);
    })
}

module.exports = UserList;