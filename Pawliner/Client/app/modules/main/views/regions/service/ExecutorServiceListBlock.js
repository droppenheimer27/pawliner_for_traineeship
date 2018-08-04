define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/service/ExecutorServiceListBlock.html'
], function (_, marionette, template) {
    'use strict';

    return marionette.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            // this.model.fetch();
            console.log(this.model, '----------ExecutorServiceListBlock');
        }
    });
});
