/**
 * Created by max on 1/31/16.
 */
var express = require('express');
var router = express.Router();

var controller  = require('../controllers/goods-controller');

router.get('/:id', function(req, res, next) {
    var id = req.params.id;

        // succeed
        res.send({
            success: true,
            goods: id
        });

});