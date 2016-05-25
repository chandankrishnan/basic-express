/**
 * define require modules
 */
var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    comm = require('../helper/common'),
    conn = require('../database/userSchema'),
    fs = require('fs');

/**
 * @constructor
 */
function content() {
    EventEmitter.call(this);
}
util.inherits(content, EventEmitter);

/**
 * In this function add content in database
 * @param {postData}
 * @param {cb}
 */
content.prototype.addContent = function(postData, cb) {
    /** 
    @this {self} refers to emit function
    */
    var self = this;
    /** 
     * check file format valid or not
     */
    if (comm.isFile(postData.file.originalFilename)) {
        fs.readFile(postData.file.path, function(error, data) {
            var data = new conn.addContent({
                contentType: postData.contentType,
                displayName: postData.displayName,
                description: postData.description,
                content: postData.file.originalFilename,
                contentId: postData.contentId,
                userId: postData.userId
            });
            /**
             * save data in database
             * @return {successfully uploaded}
             */
            data.save(function(error, result) {
                if (error) {
                    cb(error, null);
                } else {
                    self.emit('data-save');
                    cb(null, "successfully uploaded");
                }
            });
        });
    } else {
        cb("wrong file format", null);
    }
};
/**
 * In this function which action perform on content and update in database
 * @param {data}
 * @param {cb}
 */
content.prototype.contentView = function(data, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * check Number valid or not
     */
    if (comm.isNumber(data.contentId)) {
        conn.addContent.update({
            contentId: data.contentId
        }, {
            $set: {
                action: data.action
            }
        }, function(error) {
            if (error) {
                cb(error, null);
            } else {
                self.emit('update data');
                cb(null, "successfully update");
            }
        });
    } else {
        cb("plz enter Number only", null);
    }
};

/**
 * In this function,find users in database
 * @param {[array]}
 */
content.prototype.userbyId = function(data, cb) {
    /**
     * find in database
     * @return error or result
     */
    conn.addContent.find({
        userId: {
            $in: data.params
        }
    }, function(error, result) {
        if (error) {
            cb(error, null);
        } else {
            cb(null, result);
        }
    });
};

/**
 * In this function,find content in database
 * @param {[array]}
 */
content.prototype.contentbyId = function(data, cb) {
    /**
     * find in database
     * @return error or result
     */
    conn.addContent.find({
        contentId: {
            $in: data.params
        }
    }, function(error, result) {
        if (error) {
            cb(error, null);
        } else {
            cb(null, result);
        }
    });
};

/**
 * @exports {content}
 */
module.exports = content;