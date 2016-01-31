/**
 * Created by max on 1/30/16.
 */
define([
    'angular',
    'app/utils/logger'
], function (angular, logger) {
    'use strict';

    return {
        goods: function($http, user, handler) {
            logger.debug('login', user.username);

            $http({
                method  : 'GET',
                url     : '/api/user/' + user.username + '/goods/'
            })
            .success(function(data) {
                logger.debug(data);

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