var mongo = require('mongoose'),
    mongoose = require('./db'),
    util = require("util"),
    EventEmitter = require("events").EventEmitter,
    conn = require('../database/userSchema'),
    comm = require('../helper/common');

function authenticate() {
    EventEmitter.call(this);
}

authenticate.prototype.token = function(postData, cb) {
  var self=this;
    if (comm.isEmail(postData.email)) {
        conn.angularUser.findOne({
            email: postData.email,
            password: postData.password
        }, function(err, existingUser) {
            if (!existingUser) {
                var token = comm.createJWT(postData.email);
                conn.angularUser.update({
                    email: postData.email,
                    password: postData.password
                }, {
                    $set: {
                        token: token
                    }
                }, function(error) {
                    if (error) {
                        return cb(error, null);
                    } else {
                      self.emit('send token');
                        return cb(null, token);
                    }
                });
            } else {
                cb("email and password not existing in database", null)
            }
        })
    } else {
        return cb("Invalid Email", null);
    }
};

authenticate.prototype.gitToken = function(params, cb) {
    var accessTokenUrl = 'https://github.com/login/oauth/access_token';
    var userApiUrl = 'https://api.github.com/user';
    cb(null, comm.createJWT(params.client_secret));
};

authenticate.prototype.mobileToken = function(mobile, cb) {
  var self=this;
    if (comm.isMobile(mobile.mobile)) {
        conn.User.findOne({
            mobile: mobile.mobile
        }, function(error, user) {
            if (error) cb(error, null);
            if (!user) {
                var token = comm.createJWT(mobile);
                self.emit('send token');
                cb(null, token);
            } else {
                cb("error in user mobile", null);
            }
        });
    } else {
        cb("Invalid Mobile Number", null)
    }
}

authenticate.prototype.verify = function(token, cb) {
var self=this;
    var verify = comm.verifyJWT(token.token)
    self.emit('token verify');
    cb(null, verify);
};

module.exports = authenticate;
