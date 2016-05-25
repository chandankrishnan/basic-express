/**
 * define require module
 */
var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    conn = require('../database/userSchema'),
    comm = require('../helper/common'),
    fs = require('fs');
/**
 * @constructor
 */
function user1() {
    EventEmitter.call(this);
}
util.inherits(user1, EventEmitter);

/**
 * In this function register a new user
 * @param {userData}
 * @return {cb}
 */
user1.prototype.newRegister = function(userData, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * check mobile valid or not
     */
    if (comm.isMobile(userData.mobile)) {
        /**
         *find mobile exist in database if exist then send otp
         */
        conn.User.findOne({
            mobile: userData.mobile
        }, function(error, existingUser) {
            if (existingUser) {
                cb("Number already exist!!!", null);
            } else {
                setTimeout(function(send) {
                    var otp = (Math.floor(Math.random() * 90000) + 10000);
                    cb(null, {
                        otp: otp
                    });
                    var data = new conn.User({
                        username: userData.username,
                        mobile: userData.mobile,
                        otp: otp
                    });
                    data.save(function(error, result) {
                        if (error)
                            cb(error, null);
                    })
                }, 100)
                self.emit('data-save');

            }
        })
    } else {
        cb("Enter proper mobile number(e.g +91-7276447408)", null)
    }
};

/**
 *In this function,verify userdata
 *@param {userData}
 *@return {cb}
 */
user1.prototype.verification = function(userData, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * check mobile valid or not
     */
    if (comm.isMobile(userData.mobile)) {
        /**
         * find data in database and update otp as a '0'
         */
        conn.User.findOne({
            mobile: userData.mobile,
            otp: userData.otp
        }, function(err, existingUser) {
            if (existingUser) {
                conn.User.update({
                    mobile: userData.mobile,
                    otp: userData.otp
                }, {
                    $set: {
                        otp: 0
                    }
                }, function(err, data) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, "seccessfully register...");
                        self.emit('data-verify');

                    }
                })
            } else {
                cb("No data Found", null);
            }
        });
    } else {
        cb("enter proper mobile number or otp", null)
    }
};

/**
 * In this function set profle picture
 *@param {userData}
 *@return {cb}
 */
user1.prototype.setprofilePic = function(userData, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * check file format valid or not
     */
    if (comm.isFile(userData.image.originalFilename)) {
        /**
         *find in database and update image in database
         */
        conn.User.findOne({
            mobile: userData.mobile
        }, function(err, existingUser) {
            if (existingUser) {
                conn.User.update({
                    image: fs.readFileSync(userData.image.path)
                }, function(err) {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, "successfully updated...");
                        self.emit('set-profile-pic');
                    }
                })
            } else {
                cb("No data Found", null);
            }
        })
    } else {
        cb("wrong file format", null);
    }
};

/**
 *In this function save the feedback from user
 *@param {postdata}
 *@return {cb}
 */
user1.prototype.feedback = function(postData, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * check email valid or not and
     * check name should be greater than 3
     * check message should be greater than 5
     */
    if (postData.name.length > 3 && postData.message.length > 5 && comm.isEmail(postData.email)) {
        /**
         * save data in database
         */
        var data = new conn.feedback({
            name: postData.name,
            email: postData.email,
            message: postData.message
        })
        data.save(function(err, result) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, "Successfully uploaded");
                self.emit('data-save');
            }
        })
    } else {
        cb("enter proper email id or name length should be greater than 3 or message length should be greater than 5", null);
    }
};

/**
 * In this function search name
 * @param {postData}
 * @return {cb}
 */
user1.prototype.search = function(postData, cb) {
    /**
     *find name in database
     */
    conn.feedback.find({
        'name': {
            $regex: postData.r
        }
    }, function(err, result) {
        if (err) {
            cb(err, null);
        } else if (isNaN(result)) {
            cb(null, result);
        } else {
            cb({
                message: 'sorry not found'
            }, null);
        }
    })
};

/**
 *In this function ,find all feedback in database
 * @return {cb}
 */
user1.prototype.searchAll = function(cb) {
    /**
     * find all data from database
     */
    conn.feedback.find({}, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    })
};

/**
 * In this function,user signup
 * @param {data}
 * @return {cb}
 */
user1.prototype.signUp = function(data, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * check  email and mobile valid or not
     * check name greater than 3
     * check password greater than 7
     */
    ;
    if (comm.isEmail(data.email) && comm.isMobile(data.contact) && data.name.length > 3 && data.password.length > 7) {
        /**
         * find in database email exist or not
         */
        conn.angularUser.findOne({
            email: data.email
        }, function(err, existingUser) {
            if (existingUser) {
                cb("email already exist..", null);
            }
            var data1 = new conn.angularUser({
                name: data.name,
                email: data.email,
                contact: data.contact,
                password: data.password
            });
            /**
             * save data1 in database
             */
            data1.save(function(err, data) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, "success save");
                    self.emit('data-save');
                }
            })
        })
    } else {
        cb("enter valid email address", null)
    }
};

/**
 * @exports {user1}
 */
module.exports = user1;