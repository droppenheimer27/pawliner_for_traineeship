define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    '../../collections/Services',
    '../regions/service/ServiceBlock',
], function (B, _, $, marionette, Services, ServiceBlock) {
    'use strict';
    return marionette.CollectionView.extend({
        childView: ServiceBlock,
        initialize: function () {
            this.listenTo(B.Radio.channel('main'), 'refreshData', this.refreshData);

            this.collection = new Services();
            this.collection.fetch();
            this.collection.on("sync", this.onSync, this);
        },
        onSync: function () {
            //console.log(this.model);
        },
        refreshData: function () {
            this.collection.fetch();
        }
    });
});
