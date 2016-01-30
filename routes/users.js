var express = require('express');
var router = express.Router();

var controller  = require('../controllers/user-controller');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
    var username = req.params.username;

    controller.getUser(username, function(user) {
        if(!user) {
            controller.createNew(username, function(user) {
                if(user) {
                    res.send({
                        success: true,
                        user: user
                    });
                } else {
                    res.send({
                        success: false,
                        error: "User could be created!"
                    });
                }

            });
        } else {
            // succeed
            res.send({
                success: true,
                user: user
            });
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
