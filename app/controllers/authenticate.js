/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    authenticate = require('../model/authenticate'),
    auth = new authenticate(),
    Event = require('events').EventEmitter;

/**
 *                         JWT for angular
 * create token
 * @param {email}
 * @param {password}
 * @return {token}
 */
router.post('/user', function(req, res) {
    var postData = {
            email: req.body.email,
            password: req.body.password
        }
        /** call token function
         */
    auth.token(postData, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

/**
 * create token
 * @param {code}
 * @param {clientId}
 * @param {client_secret}
 * @param {redirect_uri}
 * @return {token}
 */
router.post('/github', function(req, res) {
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: 'f154f7923e45f63ca749955d7b515eb499c8a1', //change'dd client secret
        redirect_uri: req.body.redirectUri
    };
    /** call gitToken function
     */
    auth.gitToken(params, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

/**
 *                    JWT for shopping pad
 * user send mobile for jwt authentication then check if it valid
 * mobile e.g(+91-7276774708) then server generate token with help
 * of secret value and send to user
 * @param {mobile}
 * @return {token}
 */
router.post('/mobile', function(req, res) {
    var mobile = {
        mobile: req.body.mobile
    };
    auth.mobileToken(mobile, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

/**
 *                      JWT for shopping pad
 * user send token then check is a token if true then verify with
 * secret value if verify then send seccessful message to user
 * else send 403 to user
 * @param {token}
 * @return {verify data}
 */
router.post('/verify', function(req, res) {
    var token = {
        token: req.body.token || req.query.token || req.headers['x-access-token']
    }
    auth.verify(token, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

/**
 * EventEmitter on
 */
auth.on('data-save', function() {
    console.log('data saved');
});

auth.on('token verify', function() {
    console.log('token verify');
});

auth.on('send token', function() {
    console.log('send token');
});

/**
 * @exports {router}
 */
module.exports = router;