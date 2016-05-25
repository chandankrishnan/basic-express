/**
 * define require module
 */
var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    conn = require('../database/userSchema');

/**
 * @constructor
 */
function UserList() {
    EventEmitter.call(this);
}
util.inherits(UserList, EventEmitter);

/**
 * In this function, get all user from database
 * @return {cb}
 */
UserList.prototype.all = function(cb) {
    /**
     * find all from database
     */
    return conn.User.find({}, function(err, data) {
        if (err) {
            return cb(err, null);
        } else {
            return cb(null, data);
        }
    });
};

/**
 * In this function, save userData in database
 * @param {userData}
 * @return {cb}
 */
UserList.prototype.save = function(userData, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * data save in database
     */
    var user = new User(userData);
    conn.user.save(function(error, data) {
        if (error) {
            return cb(error, null)
        }
        self.emit('user-saved', userData);
        return cb(null, data);
    })
}

/**
 * @exports {UserList}
 */
module.exports = UserList;