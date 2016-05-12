//============================================================//
//             module dependencies                            //
//============================================================//
var express = require('express'),
    router = express.Router(),
    content = require('../model/user1'),
    conn = new content(),
    multiparty = require('multiparty');

//============================================================//
// user send mobile and username for registration             //
// if it valid email then server send five digit otp          //
// in particular time and save in database                    //
//============================================================//
router.post('/mobile-registration', function(req, res) {
    var userData = {
        mobile: req.body.mobile,
        username: req.body.username
    }
    conn.newRegister(userData, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
});

//===========================================================//
// user send mobile and otp for conformation                 //
// if it valid email then server check in database           //
// is mobile and otp store or not if it available            //
// then it update active filed is 'true'                     //
//===========================================================//
router.post('/mobile-verification', function(req, res) {
    var userData = {
        mobile: req.body.mobile,
        otp: req.body.otp
    }
    conn.verification(userData, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
});

//==========================================================//
// user send mobile,userId and file for set profile         //
// picture if is a valid mobile and file extension          //
// are(gif|jpg|jpeg|tiff|png|bmp) then update in            //
// database                                                 //
//==========================================================//
router.post('/set-profile-pic', function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var postData = {
            image: files.image[0],
            mobile: fields.mobile
        }
        conn.setprofilePic(postData, function(error, data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })
    })
});

//=================================================================//
// user post feedback,the field i.e name,email,message then check  //
// name length should be greater than 3,email should proper or not //
// and meassage length should be greater than 5.if it's correct    //
// then save in database else show error message                   //   
//=================================================================//
router.post('/feedback', function(req, res) {
    var postData = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }
    conn.feedback(postData, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
});

//=================================================================//
// user search particular username from database                   //
//=================================================================//
router.post('/feedback1', function(req, res) {
    var postData = {
        r: new RegExp(req.body.search_str, 'i')
    }
    conn.search(postData, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
});

//=================================================================//
// server send all username from  feedback database                //
//=================================================================//
router.get('/feedback-all', function(req, res) {
    conn.searchAll(function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    })
});

//=================================================================//
// user send data i.e name,email,contact and password for signup   //
// then validate it and save in database                           // 
//=================================================================//
router.post('/signup', function(req, res) {
    console.log('inside signup');
    var postData = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password
    }
    conn.signUp(postData, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});
module.exports = router;