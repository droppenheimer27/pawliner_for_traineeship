define([
    'backbone',
    'jquery',
    'marionette',
    'text!../templates/ExecutorView.html',
    './collections/ExecutorServicesCollectionView'
], function (B, $, marionette, template, ExecutorServicesCollectionView) {
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
            serviceBlock: '.executor-service-region',
            commentsBlock: '#comments-block-region'
        },
        regions: {
            serviceBlock: '@ui.serviceBlock',
            commentsBlock: '@ui.commentsBlock'
        },
        onSync: function () {
            this.render();
        },
        onRender: function () {
            this.showChildView('serviceBlock', new ExecutorServicesCollectionView({
                collection: new B.Collection(this.model.get('ServiceClassifers'))
            }));
        }
    });
});