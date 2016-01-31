/**
 * Created by max on 1/30/16.
 */
define([
    'app/utils/dragging',
    'app/controllers/auction-controller'
], function(dragging, AuctionController) {

    return ['$document', function($document) {
        return {
            restrict: 'A',

            templateUrl: 'views/app-auction.html',

            controller: AuctionController,

            link: function(scope, element, attr) {
                dragging($document, element);

                element.on('click', function(event) {
                    var target = event.srcElement || event.target;
                    target.autofocus && target.focus();
                });
            }
        }
    }];
});