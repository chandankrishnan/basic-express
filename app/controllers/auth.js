var express = require('express'),
    router = express.Router(),
    UserList = require('../model/users'),
    user = new UserList(),
    Event = require('events').EventEmitter;

router.get('/login', function(req, res) {
    var user = {
        username: 'wfwefwefs',
        password: 'passddword',
        email: 'tedwdst@test.com'
    };
    // create a token
    var token = jwt.sign(user, '####@dew#@', {
        expiresInMinutes: 1 // expires in 24 hours
    });

    // return the information including token as JSON
    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });
});

router.get('/verify', function(req, res) {

});


module.exports = router;