define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    'text!../../templates/regions/Search.html'
], function (B, _, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            B.Radio.channel('main').reply("changeSearchmain", this.getSearch, this);
        },
        ui: {
            input: 'input[type="text"]',
        },
        triggers: {
            'keyup input': 'data:entered'
        },
        onDataEntered: function () {
            B.Radio.channel('main').trigger('changeSearchmain', this.getSearch());
        },
        getSearch: function () {
            return this.ui.input.val();
        }
    });
});
