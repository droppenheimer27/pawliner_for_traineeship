define([
    '../../../collections/RestBasePageble',
    '../models/Order'
], function (RestBasePageble, Order) {
    'use strict';

    return RestBasePageble.extend({
        model: Order,
        url : '/api/order'
    });
});