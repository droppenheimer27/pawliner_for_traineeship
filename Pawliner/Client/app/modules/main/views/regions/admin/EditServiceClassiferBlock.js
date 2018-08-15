define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/admin/EditServiceClassiferBlock.html'
], function (B, _, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
    });
});
