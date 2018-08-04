define([
    'jquery',
    'marionette',
    'text!../templates/ExecutorView.html',
    './collections/ExecutorServicesCollectionView',
    './regions/service/ExecutorServiceListBlock'
], function ($, marionette, template, ExecutorServiceListBlock, ExecutorServicesCollectionView) {
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
            var self = this;
            // console.log(this.model.get('ServiceClassifers'), '-------ExecutorView');
            this.showChildView('serviceBlock', new ExecutorServicesCollectionView({
                model: self.model.get('ServiceClassifers')
            }));
        }
    });
});