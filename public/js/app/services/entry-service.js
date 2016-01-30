/**
 * Created by max on 1/30/16.
 */
define([
    'angular',
    'app/utils/logger'
], function (angular, logger) {
    'use strict';

    return {
        login: function(username) {
            logger.debug('login', username)

            return true;
        },

        logout: function() {
            logger.debug('logout')
        }
    }
});