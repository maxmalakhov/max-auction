var express = require('express');
var router = express.Router();

var userController  = require('../controllers/user-controller');
var goodsController  = require('../controllers/goods-controller');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
    var username = req.params.username;

    userController.getUser(
        username,
        // success
        function(user) {
            res.send({
                success: true,
                user: user
            });
        },
        // failure
        function(error) {
            res.send({
                success: false,
                message: "User could be created!",
                error: error
            });
        }
    );
});

router.get('/:username/goods', function(req, res, next) {
    var username = req.params.username;

    userController.getUserGoods(
        username,
        // success
        function(goods) {
            res.send({
                success: true,
                goods: goods
            });
        },
        // failure
        function(error) {
            res.send({
                success: false,
                msg: "User does not exist!",
                error: error
            });
        }
    );
});

router.post('/', function(req, res, next) {
    var username = req.body.username;

    userController.getUser(
        username,
        // success
        function(user) {
            res.send({
                success: true,
                user: user
            });
        },
        // failure
        function(error) {
            res.send({
                success: false,
                msg: "User could be created!",
                error: error
            });
        }
    );
});

module.exports = router;
