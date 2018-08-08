define([
    'underscore',
    'marionette'
], function (_, marionette) {
    'use strict';

    return marionette.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: function(tplPrms) {
            return _.template('<%= Description %>')(tplPrms);
        }
    });
});
