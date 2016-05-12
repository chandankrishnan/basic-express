var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    comm = require('../helper/common'),
    conn = require('../database/userSchema'),
    fs = require('fs');

function content() {
    EventEmitter.call(this);
}
util.inherits(content, EventEmitter);

content.prototype.addContent = function(postData, cb) {
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
            data.save(function(error, result) {
                if (error) {
                    cb(error, null);
                } else {
                    cb(null, "successfully uploaded");
                }
            });
        });
    } else {
        cb("wrong file format", null);
    }
};

content.prototype.contentView = function(data, cb) {
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
                cb(null, "successfully update");
            }
        });
    } else {
        cb("plz enter Number only", null);
    }
};

content.prototype.userbyId = function(data, cb) {
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

content.prototype.contentbyId = function(data, cb) {
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
module.exports = content;