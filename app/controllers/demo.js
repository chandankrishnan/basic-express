/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    contentInfo = require('../model/demo'),
    content = new contentInfo(),
    Event = require('events').EventEmitter;

/**
 * Get contentinfo in json format
 */
router.get('/contentInfo', function(req, res) {
    res.send(content.contentInfo());
});

/**
 * Get usercontentView in json format
 */
router.get('/user-content-view', function(req, res) {
    res.send(content.userContentView())
});

/**
 * Get participant
 */
router.post('/:contentid/participant', function(req, res) {
    var contentId = req.params.contentid;
    res.send(content.getParticipant(contentId));
});

/**
 * Get zip
 */
router.get('/zip', function(req, res) {
    res.download('./zip/Content.zip');
});

function rawBody(req, res, next) {
    var chunks = [];

    req.on('data', function(chunk) {
        chunks.push(chunk);
    });

    req.on('end', function() {
        var buffer = Buffer.concat(chunks);
        req.bodyLength = buffer.length;
        req.rawBody = buffer;
        next();
    });

    req.on('error', function(err) {
        console.log(err);
        res.status(500);
    });
}


/**
 * user post mobile,username and image and save in database
 */
router.post('/:mobile/:username', rawBody, function(req, res) {
    if (req.rawBody && req.bodyLength > 0) {
        var data = {
            mobile: req.params.mobile,
            username: req.params.username,
            image: req.rawBody
        }
        content.postdata(data, function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
    }
})

/**
 * EventEmitter on
 */
content.on('data-save', function() {
    console.log('data saved');
})

/**
 * @exports {router}
 */
module.exports = router;