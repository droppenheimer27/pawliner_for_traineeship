define([
    'underscore',
    'jquery',
    'marionette',
    '../../collections/Services',
    '../regions/service/ServiceBlock',
], function (_, $, marionette, Services, ServiceBlock) {
    'use strict';
    return marionette.CollectionView.extend({
        childView: ServiceBlock,
        initialize: function () {
            this.collection = new Services();
            this.collection.fetch();
            this.collection.on("sync", this.onSync, this);
        },
        onSync: function () {
            //console.log(this.model);
        },
    });
});
