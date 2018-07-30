define([
    'underscore',
    'jquery',
    'marionette',
    '../../collections/Orders',
    '../regions/order/OrderBlock',
], function (_, $, marionette, Orders, OrderBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        childView: OrderBlock,
        initialize: function () {
            this.collection = new Orders(),
            this.collection.fetch();
        }
    });
});
