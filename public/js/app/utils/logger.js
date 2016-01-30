/**
 * Created by max on 1/30/16.
 */
define([

], function() {
    'use strict';

    return {
        log : function( message, arg ) {
            console.log( message, arg );
        },
        debug : function( message, arg ) {
            console.debug( message, arg );
        }
    };

});