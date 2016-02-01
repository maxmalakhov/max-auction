/**
 * Created by max on 1/30/16.
 */
define([
    'angular',
    'app/utils/logger'
], function (angular, logger) {
    'use strict';

    return {
        user: function($http, user, handler) {

            $http({
                method  : 'GET',
                url     : '/api/user/' + user.username
            })
            .success(function(data) {

                handler(data)
            })
            .error(function(error) {
                logger.debug(error);

                handler({ success: false, error: error})
            });
        },

        logout: function() {
            logger.debug('logout');

            return true;
        }
    }
});