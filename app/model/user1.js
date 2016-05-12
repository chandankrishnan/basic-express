var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    conn = require('../database/userSchema'),
    comm = require('../helper/common'),
    fs = require('fs');

function user1() {
    EventEmitter.call(this);
}
util.inherits(user1, EventEmitter);

user1.prototype.newRegister = function(userData, cb) {
    if (comm.isMobile(userData.mobile)) {
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

            }
        })
    } else {
        cb("Enter proper mobile number(e.g +91-7276447408)", null)
    }
};

user1.prototype.verification = function(userData, cb) {
    if (comm.isMobile(userData.mobile)) {
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

user1.prototype.setprofilePic = function(userData, cb) {
    if (comm.isFile(userData.image.originalFilename)) {
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

user1.prototype.feedback = function(postData, cb) {
    if (postData.name.length > 3 && postData.message.length > 5 && comm.isEmail(postData.email)) {
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
            }
        })
    } else {
        cb("enter proper email id or name length should be greater than 3 or message length should be greater than 5", null);
    }
};

user1.prototype.search = function(postData, cb) {
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

user1.prototype.searchAll = function(cb) {
    conn.feedback.find({}, function(err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    })
};

user1.prototype.signUp = function(data, cb) {
    if (comm.isEmail(data.email) && comm.isMobile(data.contact) && data.name.length > 3 && data.password.length > 7) {
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
            data1.save(function(err, data) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, "success save");
                }
            })
        })
    } else {
        cb("enter valid email address", null)
    }
};

module.exports = user1;