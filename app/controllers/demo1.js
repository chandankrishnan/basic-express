var express = require('express'),
    router = express.Router(),
    multiparty = require('multiparty');

router.post('/postData', function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, file, field) {
        var file = file.file;
        console.log(file);
    })
})
module.exports = router;