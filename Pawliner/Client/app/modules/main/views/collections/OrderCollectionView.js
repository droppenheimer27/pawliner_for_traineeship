define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    '../../collections/Orders',
    '../regions/order/OrderBlock'
], function (B, _, $, marionette, Orders, OrderBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        childView: OrderBlock,
        collection: new Orders(),
        initialize: function () {
            this.listenTo(B.Radio.channel('main'),'getOrdersByCheckbox', this.getOrdersByCheckbox);
            this.collection.fetch();
        },

        getOrdersByCheckbox: function (services) {
            this.collection.fetch({
                data: {
                    filter: services
                },
            });

            this.render();
        },
    });
});
