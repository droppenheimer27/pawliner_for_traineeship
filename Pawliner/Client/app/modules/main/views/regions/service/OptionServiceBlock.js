define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/service/SelectServiceBlock.html'   
], function (_, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
    });
});
