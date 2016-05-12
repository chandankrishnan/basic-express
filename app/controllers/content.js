var express = require('express'),
    router = express.Router(),
    content = require('../model/content'),
    conn = new content(),
    multiparty = require('multiparty');

//=================================================================//
//                     user add new content                        //
// if it valid extension i.e(gif|jpg|jpeg|tiff|png|bmp and save    //
//in database                                                      //
//=================================================================//
router.post('/content', function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(error, fields, files) {
        var postData = {
            file: files.file[0],
            userId: fields.uid[0],
            contentId: fields.cid[0],
            displayName: fields.displayName[0],
            description: fields.description[0],
            contentType: files.file[0].originalFilename.substring(files.file[0].originalFilename.lastIndexOf('.') + 1, files.file[0].originalFilename.length)
        };
        conn.addContent(postData, function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        });
    })
});

//=================================================================//
//                      user view content                          //
// user send contentId and action then it check valid              //
// contentId then update action in database                        //
//=================================================================//
router.get('/user-content-view/:contentId/:action', function(req, res) {
    var Data = {
        contentId: req.params.contentId,
        action: req.params.action
    }
    conn.contentView(Data, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

//=================================================================//
// view user content by passing array of userId then spit userId   //
// and find userId in database then send result in json format     //
//=================================================================//
router.get('/user-content-byid/:userId', function(req, res) {
    var Data = {
        params: req.params.userId.split(',')
    }
    conn.userbyId(Data, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
});

//================================================================//
// view user content by passing array of contentId then spit      // 
// contentId and find contentId in database then send result      //
// in json format                                                 // 
//================================================================//
router.get('/user-content-info/:contentId', function(req, res) {
    var Data = {
        params: req.params.contentId.split(',')
    }
    conn.contentbyId(Data, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
});

module.exports = router;