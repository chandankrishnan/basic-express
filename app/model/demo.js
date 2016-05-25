/**
 * define require module
 */
var util = require("util"),
    EventEmitter = require("events").EventEmitter,
    conn = require('../database/userSchema');

/**
 * define json for content
 */
var id = 1;
var content = [{
    "content_id": id++,
    "contentType": "video",
    "title": 783,
    "url": "783.name",
    "display_name": "Display1",
    "imagesLink": "http://placeho",
    "contentLink": "http://notebook.com",
    "decription": "Nisi proident eu duis nostrud aliqua aliquip. Irure proident laboris cupidatat nisi velit aute ut sunt nisi non et. Ad non proident nostrud fugiat culpa tempor ex laborum ut. Commodo nisi eu mollit consequat commodo qui do eu fugiat.",
    "syncDateTime": "Thursday November 12 2015 5:49 AM",
    "created_at": "Wednesday, June 10, 2015 8:20 PM",
    "modified_at": "Wednesday, March 19, 2014 10:28 AM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "audio",
    "title": 246,
    "url": "246.us",
    "display_name": "Display3",
    "imagesLink": "http://server.myspace-shack.com/d21/br.png ",
    "contentLink": "http://server.myspace-shack.com/d21/images77758.jpg",
    "decription": "Ex velit ad qui dolor eiusmod nulla. Exercitation ea excepteur excepteur sunt quis incididunt. Veniam velit ea ex mollit nulla deserunt esse sint in proident exercitation aliqua proident. Minim culpa occaecat Lorem ex quis dolore magna fugiat amet sunt ea id. Ex mollit incididunt in minim nostrud elit dolor ex eiusmod aliqua incididunt.",
    "syncDateTime": "Tuesday December 8 2015 1:44 AM",
    "created_at": "Saturday, November 22, 2014 3:29 PM",
    "modified_at": "Wednesday, September 2, 2015 11:51 AM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "image",
    "title": 572,
    "url": "572.biz",
    "display_name": "Display3",
    "imagesLink": "http://server.myspace-shack.com/d21/images77758.jpg",
    "contentLink": "http://server.myspace-shack.com/d21/picsbox.jpg",
    "decription": "Reprehenderit do adipisicing incididunt enim in minim elit qui officia et non enim. Aliquip veniam mollit dolor enim est. Nostrud minim velit quis magna occaecat velit nostrud qui quis anim eu amet aliqua culpa. Qui do velit incididunt irure minim nostrud sint consectetur amet ut sunt quis magna. Laborum irure incididunt laboris enim culpa in eiusmod nostrud consectetur. Consequat do est Lorem est nostrud.",
    "syncDateTime": "Friday July 18 2014 6:34 PM",
    "created_at": "Thursday, January 1, 2015 9:48 PM",
    "modified_at": "Tuesday, January 26, 2016 6:15 PM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "audio",
    "title": 193,
    "url": "193.org",
    "display_name": "Display2",
    "imagesLink": "http://server.myspace-shack.com/d21/chai.png",
    "contentLink": "http://server.myspace-shack.com/d21/yeomancharactersticker.png",
    "decription": "Adipisicing culpa deserunt cupidatat laboris. Voluptate Lorem quis ea veniam tempor nostrud ut dolor. Enim et commodo labore magna consectetur nostrud voluptate eu aute. Do excepteur dolore ad magna id esse sunt anim est proident nostrud Lorem.",
    "syncDateTime": "Wednesday October 21 2015 7:20 AM",
    "created_at": "Thursday, September 24, 2015 10:28 PM",
    "modified_at": "Saturday, May 16, 2015 7:29 PM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "audio",
    "title": 630,
    "url": "630.com",
    "display_name": "Display3",
    "imagesLink": "http://server.myspace-shack.com/d21/download28393.jpg",
    "contentLink": "http://server.myspace-shack.com/d21/images 136704.jpg",
    "decription": "Enim laborum non deserunt nisi commodo. Dolor duis cillum incididunt ut ut ullamco amet. Ipsum nulla qui reprehenderit aliqua consectetur deserunt ut sunt ullamco voluptate non sunt aute. Excepteur occaecat consequat aliquip dolor eu commodo sunt laborum sit quis ut sunt consectetur. Quis enim id voluptate commodo ea aliqua duis incididunt ex incididunt eiusmod irure. Voluptate occaecat irure ut nostrud ullamco qui eu esse laboris ullamco aliquip nulla. Ad pariatur ex duis Lorem pariatur est irure elit consequat voluptate elit consectetur sit.",
    "syncDateTime": "Monday October 19 2015 8:41 PM",
    "created_at": "Sunday, January 11, 2015 6:47 PM",
    "modified_at": "Friday, May 15, 2015 5:48 AM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "xls",
    "title": 570,
    "url": "570.me",
    "display_name": "Display1",
    "imagesLink": "http://server.myspace-shack.com/d21/images 243309.jpg",
    "contentLink": "http://server.myspace-shack.com/d21/images77758.jpg",
    "decription": "Sit deserunt proident officia laborum Lorem ea enim. Aliquip deserunt magna id excepteur. Cupidatat esse non sunt ut minim qui elit anim et nostrud incididunt nulla aliquip adipisicing. Commodo est reprehenderit veniam proident eiusmod.",
    "syncDateTime": "Friday, January 8, 2016 5:06 AM",
    "created_at": "Monday December 14 2015 9:22 AM",
    "modified_at": "Saturday, May 16, 2015 2:42 AM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "xls",
    "title": 891,
    "url": "891.net",
    "display_name": "Display3",
    "imagesLink": "http://server.myspace-shack.com/d21/images 462059.jpg",
    "contentLink": "http://server.myspace-shack.com/d21/images 328729.jpg",
    "decription": "Irure ea esse magna pariatur ipsum consectetur et voluptate ex sit aliquip deserunt incididunt. Adipisicing eu non ut ex Lorem commodo culpa cillum aliqua nisi aliquip. Qui nisi qui cillum nostrud pariatur elit. Qui commodo amet sunt non officia sunt ex. Non dolore tempor nulla incididunt mollit est duis.",
    "syncDateTime": "Friday April 24 2015 5:10 AM",
    "created_at": "Thursday, September 17, 2015 1:27 PM",
    "modified_at": "Saturday, June 7, 2014 11:53 AM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "product",
    "title": 300,
    "url": "300.ca",
    "display_name": "Display1",
    "imagesLink": "http://server.myspace-shack.com/d21/images 497476.jpg",
    "contentLink": "http://server.myspace-shack.com/d21/images 136704.jpg",
    "decription": "Occaecat consequat sint sit incididunt eu officia ea ad eiusmod duis pariatur veniam laboris adipisicing. Enim quis nostrud nisi consectetur dolor ad aute minim officia. Id aute veniam quis anim ipsum do elit quis nulla nostrud nulla Lorem qui.",
    "syncDateTime": "Monday January 25 2016 12:17 AM",
    "created_at": "Friday, September 12, 2014 11:41 AM",
    "modified_at": "Tuesday, September 1, 2015 7:56 PM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "audio",
    "title": 221,
    "url": "221.info",
    "display_name": "Display1",
    "imagesLink": "http://server.myspace-shack.com/d21/images 290984.jpg",
    "contentLink": "http://server.myspace-shack.com/d21/chai.png",
    "decription": "Sunt ex deserunt enim sunt occaecat amet ipsum. Pariatur occaecat Lorem ea officia elit et deserunt dolore dolor aute nostrud non excepteur. Nostrud commodo cupidatat adipisicing esse consectetur eiusmod eiusmod fugiat exercitation eiusmod ad consectetur. Non laborum sit cupidatat fugiat ipsum veniam deserunt Lorem ullamco tempor. Veniam exercitation tempor sit qui velit quis dolor dolor adipisicing elit enim.",
    "syncDateTime": "Tuesday March 8 2016 8:07 PM",
    "created_at": "Friday, June 6, 2014 11:59 PM",
    "modified_at": "Tuesday, July 22, 2014 2:04 AM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}, {
    "content_id": id++,
    "contentType": "video",
    "title": 140,
    "url": "140.biz",
    "display_name": "Display1",
    "imagesLink": "http://server.myspace-shack.com/d21/a42725e7751b43137d5e624783b063a0.jpg",
    "contentLink": "http://server.myspace-shack.com/d21/yeomancharactersticker.png",
    "decription": "Pariatur in consequat ipsum magna sit excepteur in. Ullamco minim sit reprehenderit anim nulla velit aute sunt pariatur nulla exercitation fugiat Lorem. Ipsum officia reprehenderit sint dolore nostrud et nisi quis labore amet sit qui. Culpa non reprehenderit magna exercitation. Dolore mollit aliquip irure consectetur pariatur consequat dolor ad consequat velit.",
    "syncDateTime": "Sunday June 1 2014 10:16 AM",
    "created_at": "Saturday, April 18, 2015 1:34 PM",
    "modified_at": "Friday, April 25, 2014 7:00 AM",
    "zip": "http://54.86.64.100:3000/api/v1/content/zip"
}];

/**
 * define json for userView
 */
var userView = [{
    "userContentId": 0,
    "userAdminId": 0,
    "contentId": 0,
    "userId": 0,
    "firstName": "Bernadette",
    "lastName": "Contreras",
    "email": "bernadette.contreras@gmail.com",
    "displayProfile": "http://server.myspace-shack.com",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "numberofparticipant": 15,
    "action": "share"
}, {
    "userContentId": 1,
    "userAdminId": 1,
    "contentId": 1,
    "userId": 1,
    "firstName": "Jo",
    "lastName": "Mcpherson",
    "email": "jo.mcpherson@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/download28393.jpg",
    "lastViewedDateTime": "Thursday, December 25, 2014 1:31 AM",
    "numberOfViews": 43,
    "numberofparticipant": 25,
    "action": "view"
}, {
    "userContentId": 2,
    "userAdminId": 2,
    "contentId": 2,
    "userId": 2,
    "firstName": "Hebert",
    "lastName": "Donaldson",
    "email": "hebert.donaldson@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/bridge.png",
    "lastViewedDateTime": "Saturday, August 30, 2014 8:59 PM",
    "numberOfViews": 36,
    "numberofparticipant": 20,
    "action": "click"
}, {
    "userContentId": 3,
    "userAdminId": 3,
    "contentId": 3,
    "userId": 3,
    "firstName": "Johnston",
    "lastName": "Frye",
    "email": "johnston.frye@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/yeomancharactersticker.png",
    "lastViewedDateTime": "Thursday, March 5, 2015 1:58 PM",
    "numberOfViews": 18,
    "numberofparticipant": 26,
    "action": "open"
}, {
    "userContentId": 4,
    "userAdminId": 4,
    "contentId": 4,
    "userId": 4,
    "firstName": "Oconnor",
    "lastName": "Gaines",
    "email": "oconnor.gaines@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/forepic.jpg ",
    "lastViewedDateTime": "Wednesday, October 7, 2015 1:32 PM",
    "numberOfViews": 33,
    "numberofparticipant": 30,
    "action": "share"
}, {
    "userContentId": 5,
    "userAdminId": 5,
    "contentId": 5,
    "userId": 5,
    "firstName": "Jeanie",
    "lastName": "Moon",
    "email": "jeanie.moon@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/images 136704.jpg ",
    "lastViewedDateTime": "Friday, November 27, 2015 7:20 PM",
    "numberOfViews": 28,
    "numberofparticipant": 10,
    "action": "delete"
}, {
    "userContentId": 6,
    "userAdminId": 6,
    "contentId": 6,
    "userId": 6,
    "firstName": "Hull",
    "lastName": "Morrow",
    "email": "hull.morrow@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/images 243309.jpg ",
    "lastViewedDateTime": "Saturday, March 12, 2016 5:45 AM",
    "numberOfViews": 99,
    "numberofparticipant": 09,
    "action": "open"
}, {
    "userContentId": 7,
    "userAdminId": 7,
    "contentId": 7,
    "userId": 7,
    "firstName": "Samantha",
    "lastName": "Rowe",
    "email": "samantha.rowe@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/images77758.jpg ",
    "lastViewedDateTime": "Thursday, November 13, 2014 10:46 PM",
    "numberOfViews": 21,
    "numberofparticipant": 08,
    "action": "click"
}, {
    "userContentId": 8,
    "userAdminId": 8,
    "contentId": 8,
    "userId": 8,
    "firstName": "Liza",
    "lastName": "Hancock",
    "email": "liza.hancock@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/images 462059.jpg ",
    "lastViewedDateTime": "Saturday, May 2, 2015 10:44 PM",
    "numberOfViews": 93,
    "numberofparticipant": 07,
    "action": "share"
}, {
    "userContentId": 9,
    "userAdminId": 9,
    "contentId": 9,
    "userId": 9,
    "firstName": "Lawanda",
    "lastName": "Nieves",
    "email": "lawanda.nieves@gmail.com",
    "displayProfile": "http://server.myspace-shack.com/d21/images 328729.jpg ",
    "lastViewedDateTime": "Thursday, July 31, 2014 2:37 AM",
    "numberOfViews": 38,
    "numberofparticipant": 12,
    "action": "open"
}];

/**
 * define json for participant
 */
var participant = [{
    "userId": 0,
    "contentId": 1,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images 328729.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "open"
}, {
    "userId": 0,
    "contentId": 2,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images 462059.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "click"
}, {
    "userId": 1,
    "contentId": 1,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images77758.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "share"
}, {
    "userId": 1,
    "contentId": 3,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images 243309.jp",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "read"
}, {
    "userId": 2,
    "contentId": 1,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images 136704.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "modify"
}, {
    "userId": 3,
    "contentId": 4,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images77758.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "share"
}, {
    "userId": 3,
    "contentId": 5,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/bridge.png",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "open"
}, {
    "userId": 3,
    "contentId": 2,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images 462059.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "click"
}, {
    "userId": 4,
    "contentId": 6,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/chai.png",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "modify"
}, {
    "userId": 4,
    "contentId": 5,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images 136704.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "read"
}, {
    "userId": 4,
    "contentId": 2,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/download28393.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "click"
}, {
    "userId": 5,
    "contentId": 3,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/yeomancharactersticker.png",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "share"
}, {
    "userId": 5,
    "contentId": 6,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/br.png",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "open"
}, {
    "userId": 6,
    "contentId": 0,
    "Name": "Bernadette",
    "Image": "http://server.myspace-shack.com/d21/images77758.jpg",
    "lastViewedDateTime": "Thursday, September 18, 2014 1:15 AM",
    "numberOfViews": 49,
    "action": "share"
}];

/**
 * @constructor
 */
function Demo() {
    EventEmitter.call(this);
}
util.inherits(Demo, EventEmitter);

/**
 * In this function return content
 */
Demo.prototype.contentInfo = function() {
    return content;
};

/**
 * In this function return userView
 */
Demo.prototype.userContentView = function() {
    return userView;
};

/**
 * In this function return participant
 */
Demo.prototype.getParticipant = function(data) {
    var params = data.split(',');
    var result = [];
    for (var i = 0; i < params.length; i++) {
        for (var j = 0; j < participant.length; j++) {
            if (params[i] == participant[j].contentId) {
                result.push(participant[j]);
            }
        }
    }
    return result;
};

/**
 * In this function, save file,mobile,username in database
 * @param {data}
 * @param {cb}
 */
Demo.prototype.postdata = function(data, cb) {
    /** 
     *@this {self} refers to emit function
     */
    var self = this;
    /** 
     * save data in database
     */
    var data = new conn.Demo(data);
    data.save(function(error, result) {
        if (error) {
            cb(error, null)
        } else {
            self.emit('data-save');
            cb(null, "successfully save");
        }
    })
}

/**
 * @exports {Demo}
 */
module.exports = Demo;