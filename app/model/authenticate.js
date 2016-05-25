/**
 * define require modules
 */
var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    conn = require('../database/userSchema'),
    comm = require('../helper/common');

/**
 * @constructor
 */
function authenticate() {
    EventEmitter.call(this);
}
util.inherits(authenticate, EventEmitter);

/** 
 * In this function send token to user if exist in database then
 * update token in database
 * @param {postData}
 * @param {cb}
 */
authenticate.prototype.token = function(postData, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * check email valid or not
     */
    if (comm.isEmail(postData.email)) {
        /**
         * find email or password in database
         */
        conn.angularUser.findOne({
            email: postData.email,
            password: postData.password
        }, function(err, existingUser) {
            if (!existingUser) {
                /** 
                 * create token and update in databse
                 */
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

/** In this function for github 
 *@param {params}
 *@param {cb}
 *@return {token}
 */
authenticate.prototype.gitToken = function(params, cb) {
    /**
     *@param {accessTokenUrl}
     *@param {userApiUrl}
     */
    var accessTokenUrl = 'https://github.com/login/oauth/access_token';
    var userApiUrl = 'https://api.github.com/user';
    /**
     * create token
     */
    cb(null, comm.createJWT(params.client_secret));
};

/** 
 * In this function send token to user if exist in database then
 * update token in database
 * @param {mobile}
 * @param {cb}
 * @return {token}
 */
authenticate.prototype.mobileToken = function(mobile, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * check mobile valid or not
     */
    if (comm.isMobile(mobile.mobile)) {
        /**
         * find mobile in database
         */
        conn.User.findOne({
            mobile: mobile.mobile
        }, function(error, user) {
            if (error) cb(error, null);
            if (!user) {
                /** 
                 * creat token
                 **/
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

/** In this function verify token is valid or not 
 * @param {token}
 * @param {cb}
 * return {verify token}
 */
authenticate.prototype.verify = function(token, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * verify token
     */
    var verify = comm.verifyJWT(token.token)
    self.emit('token verify');
    cb(null, verify);
};
/**
 * @exports {authenticate}
 */
module.exports = authenticate;