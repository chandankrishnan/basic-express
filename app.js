/**
 * define require modules for app
 */
var express = require('express'),
    app = express(),
    http = require('http'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3005,
    db = require('./app/model/db'),
    colors = require('colors'),
    logger = require('./app/helper/logger');

/**
 * configure modules
 */
app.set('views', __dirname + '/app/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')
app.set('superSecret', '#r4dew@#E#@cfdsfffwe342432CDSEWF#2fd@@@#E');
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(compression())
app.use(bodyParser.urlencoded({
    extended: true
}))

/** 
 * middelware to load controllers
 */
app.use(require('./app/controllers'))

/** 
 * when database connect with then server start
 */
db.connect(function() {
    http.createServer(app).listen(port);
    console.log('server connecting on port '.rainbow + port)
});

/** 
 *log info when connect with database
 */
db.get().connection.on('connected', function() {
    logger.info('Mongoose connected on port ' + port);
});

/** 
 * If the Node process ends, close the Mongoose connection
 */
process.on('SIGINT', function() {
    db.get().connection.close(function() {
        logger.info('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});