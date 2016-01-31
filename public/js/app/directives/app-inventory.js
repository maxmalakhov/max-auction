/**
 * Created by max on 1/30/16.
 */
define([
    'jquery',
    'bootstrap',
    'app/utils/dragging',
    'app/controllers/inventory-controller'
], function($, bootstrap, dragging, InventoryController) {

    return ['$document', '$timeout', function($document, $timeout) {
        return {
            restrict: 'A',

            templateUrl: 'views/app-inventory.html',

            controller: InventoryController,

            link: function(scope, element, attr) {
                dragging($document, element);

                $timeout(function() {
                    $(element).find('[data-toggle="tooltip"]').tooltip();
                }, 500);
            }
        }
    }];
});