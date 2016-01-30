/**
 * Created by max on 1/30/16.
 */
define([
    'app/utils/dragging',
    'app/controllers/stats-controller'
], function(dragging, StatsController) {

    return ['$document', function($document) {
        return {
            restrict: 'A',

            templateUrl: 'views/app-stats.html',

            controller: StatsController,

            link: function(scope, element, attr) {
                dragging($document, element);
            }
        }
    }];
});