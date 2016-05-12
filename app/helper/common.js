var jwt = require('jsonwebtoken'),
    secret = require('../config/secret');

module.exports = {
    isEmail: function(email) {
        if (email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,6})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
            return true
        } else {
            return false
        }
    },

    isFile: function(file) {
        if (file.match(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i)) {
            return true
        } else {
            return false
        }
    },

    isNumber: function(number) {
        if (number.match(/[0-9]/)) {
            return true
        } else {
            return false
        }
    },

    isMobile: function(mobile) {
        if (mobile.match(/^(\+){1}91(\-){1}\d[0-9]{9}$/)) {
            return true
        } else {
            return false
        }
    },

    createJWT: function(data) {
        return jwt.sign(data, secret.secret);
    },

    verifyJWT: function(data) {
        return jwt.verify(data, secret.secret)
    }
}