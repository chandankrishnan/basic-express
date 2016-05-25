/**
 * define require module
 */
var express = require('express'),
    router = express.Router();
/**
 * configure route
 */
router.use('/users', require('./users'));
router.use('/demo', require('./demo'));
router.use('/auth', require('./authenticate'));
router.use('/content', require('./content'));
router.use('/user1', require('./user1'));

/**
 * Home
 */
router.get('/', function(req, res) {
    res.send('This is main controller');
});

/**
 * @exports {router}
 */
module.exports = router;