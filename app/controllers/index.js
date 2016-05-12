var express = require('express'),
    router = express.Router();

router.use('/users', require('./users'));
router.use('/demo', require('./demo'));
router.use('/auth', require('./authenticate'));
router.use('/content', require('./content'));
router.use('/user1', require('./user1'));
router.use('/demo1', require('./demo1'));
//home page
router.get('/', function(req, res) {
    res.send('This is main controller');
});

module.exports = router;