/**
 * define require module
 */
var jwt = require('jsonwebtoken'),
    secret = require('../config/secret');

/**
 * @exports {isEmail,isFile,isNumber,isMobile,createJWT,verifyJWT}
 */
module.exports = {
    /**
     * this function for check email valid or not
     * @param {email}
     * @return {true,false}
     */
    isEmail: function(email) {
        if (email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,6})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)) {
            return true
        } else {
            return false
        }
    },
    /**
     * this function for check file format valid or not
     * @param {file}
     * @return {true,false}
     */
    isFile: function(file) {
        if (file.match(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i)) {
            return true
        } else {
            return false
        }
    },
    /**
     * this function for check number valid or not
     * @param {number}
     * @return {true,false}
     */
    isNumber: function(number) {
        if (number.match(/[0-9]/)) {
            return true
        } else {
            return false
        }
    },
    /**
     * this function for check mobile valid or not
     * @param {mobile}
     * @return {true,false}
     */
    isMobile: function(mobile) {
        if (mobile.match(/^(\+){1}91(\-){1}\d[0-9]{9}$/)) {
            return true
        } else {
            return false
        }
    },
    /**
     * this function for create JWY token
     * @param {data}
     * @return {token}
     */
    createJWT: function(data) {
        return jwt.sign(data, secret.secret);
    },
    /**
     * this function for verify data
     * @param {data}
     * @return {data}
     */
    verifyJWT: function(data) {
        return jwt.verify(data, secret.secret)
    }
}