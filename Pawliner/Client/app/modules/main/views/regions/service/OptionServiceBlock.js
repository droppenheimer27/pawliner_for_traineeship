define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/service/SelectServiceBlock.html'
], function (_, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        tagName: 'option',
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        attributes: function() {
            return {
                value: this.model.get("Id")
            };
        },
    });
});
