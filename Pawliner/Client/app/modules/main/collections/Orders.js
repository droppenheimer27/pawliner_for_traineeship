define([
    'backbone',
    '../models/Order',
    'bpaginator'
], function (B, Order) {
    'use strict';

    return B.Collection.extend({
        model: Order,
        url : '/api/order'
    });
});