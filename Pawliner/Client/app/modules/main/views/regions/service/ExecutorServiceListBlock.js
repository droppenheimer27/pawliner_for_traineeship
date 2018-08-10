define([
    'underscore',
    'marionette'
], function (_, marionette) {
    'use strict';

    return marionette.View.extend({
        tagName: 'li',
        template: function(tplPrms) {
            return _.template('<%= Description %>')(tplPrms);
        }
    });
});
