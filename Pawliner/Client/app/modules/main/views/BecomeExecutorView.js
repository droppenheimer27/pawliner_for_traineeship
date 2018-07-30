define([
    'underscore',
    'jquery',
    'marionette',
    'text!../templates/BecomeExecutorView.html'
], function (_, $, Mn, template) {
    'use strict';

    return Mn.View.extend({
        initialize: function() {
            console.log('BecomeExecutorView')
        },
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            // orderForm: '#orderForm'
        },
        regions: {
            content: '.content'
        }
    });
});
