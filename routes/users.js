var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:username', function(req, res, next) {
    var username = req.params.username;

    res.send({
        success: true,
        user: {
            username: username,
            fullname: 'Ivan Mal',
            coins: 1111
        }
    });
});

router.post('/', function(req, res, next) {
    var username = req.params.username;

    res.send({
        success: true,
        username: username
    });
});

module.exports = router;
