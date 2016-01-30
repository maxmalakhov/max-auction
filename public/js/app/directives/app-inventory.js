/**
 * Created by max on 1/30/16.
 */
define([
    'app/utils/dragging',
    'app/controllers/inventory-controller'
], function(dragging, InventoryController) {

    return ['$document', function($document) {
        return {
            restrict: 'A',

            templateUrl: 'views/app-inventory.html',

            controller: InventoryController,

            link: function(scope, element, attr) {
                dragging($document, element);
            }
        }
    }];
});