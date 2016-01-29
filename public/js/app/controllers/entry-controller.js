/**
 * Created by max on 1/29/16.
 */
define([
    'angular'
], function (angular) {
    'use strict';

    return function($scope) {
        $scope.firstName = "John";
        $scope.lastName = "Doe";
        $scope.fullName = function() {
            return $scope.firstName + " " + $scope.lastName;
        };
    }
});