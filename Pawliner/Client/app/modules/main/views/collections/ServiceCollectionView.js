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
            this.listenTo(B.Radio.channel('main'), 'refresh', this.render);

            this.collection = new Services();
            this.collection.fetch();
            this.collection.on("sync", this.onSync, this);
        },
        onSync: function () {
            this.render();
        },
    });
});
