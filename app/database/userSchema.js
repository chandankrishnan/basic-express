//=================================================================//
//             Define dependencies and database                    //
//=================================================================//
var mongoose = require('mongoose');
// var database= "mongodb://developer:bridgeit@ds013908.mongolab.com:13908/sp";
// var conn=mongoose.connect(database);



//=================================================================//
//        Define addContent and User Schema (shopping pad app)     //
//	           also define it model and exports it                 //
//=================================================================//
var addContent = mongoose.Schema({
    userId: {
        type: Number
    },
    contentId: {
        type: Number,
        index: {
            unique: true
        }
    },
    contentType: {
        type: String
    },
    contentTitle: {
        type: String
    },
    description: {
        type: String
    },
    syncTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
        type: String,
        contentType: String
    },
    view: {
        type: Number,
        $inc: 1
    },
    lastViewed: {
        type: Date,
        default: Date.now,
        required: true
    },
    action: [String],
});
var addContent = mongoose.model('addContent', addContent, 'addContent');
exports.addContent = addContent;

var User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    otp: {
        type: Number
    },
    image: {
        type: Buffer
    },
    syncTime: {
        type: Date,
        default: Date.now,
        required: true
    },
});

var User = mongoose.model('User', User, 'User');
exports.User = User;

//=================================================================//
//       Define feedback and angularUser Schema(bridgelabz site)   //
//	           also define it model and exports it                 //
//=================================================================//
var feedback = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    syncTime: {
        type: Date,
        default: Date.now,
        required: true
    }
});

var feedback = mongoose.model('feedback', feedback, 'feedback');
exports.feedback = feedback;

var angularUser = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    contact: {
        type: String
    },
    token: {
        type: String
    },
    github: {
        type: String
    }
});
var angularUser = mongoose.model('angularUser', angularUser, 'angularUser');
exports.angularUser = angularUser;
var Demo = mongoose.Schema({
    username: {
        type: String
    },
    mobile: {
        type: String
    },
    image: {
        type: Buffer
    },
    syncTime: {
        type: Date,
        default: Date.now,
        required: true
    }
});

var Demo = mongoose.model('Demo', Demo, 'Demo');
exports.Demo = Demo;
// Embedded Name schema to be used in User Schema
var Names = mongoose.Schema({
    first: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    middle: {
        type: String,
        lowercase: true,
        trim: true
    },
    last: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    full: {
        type: String,
        lowercase: true,
        trim: true
    }
});

var userSchema = mongoose.Schema({
    name: [Names] // using Names Embedded schema defined above
    ,
    avtar: String,
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: 0
    }
});
var Users = mongoose.model('Users', userSchema, 'Users');
exports.Users = Users;