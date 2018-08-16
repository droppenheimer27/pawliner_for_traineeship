define([
    'backbone',
    '../models/ExceptionDetails'
], function (B, ExceptionDetails) {
    'use strict';

    return B.Collection.extend({
        model: ExceptionDetails,
        url: '/api/exceptiondetails'
    });
});