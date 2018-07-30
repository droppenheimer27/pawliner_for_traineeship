define([
    'backbone',
    '../models/Service'
], function (B, Service) {
    'use strict';

    return B.Collection.extend({
        model: Service,
        url : '/api/services'
    });
});