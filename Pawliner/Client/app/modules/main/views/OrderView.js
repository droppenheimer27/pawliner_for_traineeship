define([
    'jquery',
    'marionette',
    'text!../templates/OrderView.html',
    './regions/order/RespondBlock'
], function ($, marionette, template, RespondBlock) {
    'use strict';
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            this.model.fetch();
            this.model.on("sync", this.onSync, this);
        },
        ui: {
            respondBlock: '#respond-block-region'
        },
        regions: {
            respondBlock: '@ui.respondBlock'
        },
        onSync: function() {
            this.render();
        },
        onRender: function () {
            this.showChildView('respondBlock', new RespondBlock());
        }
    });
});