/**
 * Created by max on 1/31/16.
 */
define([
    'jquery',
    'notify'
], function() {
    'use strict';

    return {
        notify : function( level, title, msg ) {
            $.notify({
                icon: 'glyphicon glyphicon-'+level+'-sign',
                title: '<strong>'+title+'</strong>',
                message: msg
            }, {
                type: level
            });
        }
    };

});