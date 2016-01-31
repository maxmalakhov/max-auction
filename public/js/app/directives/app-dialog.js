/**
 * Created by max on 1/30/16.
 */
define([
    'jquery',
    'bootstrap',
    'app/utils/dragging',
    'app/controllers/dialog-controller'
], function($, bootstrap, dragging, DialogController) {

    return ['$document', function($document) {
        return {
            restrict: 'A',

            templateUrl: 'views/app-dialog.html',

            controller: DialogController,

            replace: true,

            link: function (scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function(value){
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                element.on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                element.on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        }
    }];
});