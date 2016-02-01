/**
 * Created by max on 1/30/16.
 */
define([
    'angular',
    'app/utils/logger'
], function (angular, logger) {
    'use strict';

    return {
        login: function($http, username, handler) {

            $http({
                method  : 'POST',
                url     : '/api/user',
                data    : { username: username }
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