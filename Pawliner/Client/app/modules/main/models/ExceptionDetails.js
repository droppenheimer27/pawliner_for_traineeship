define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        idAttribute: 'Id',
        urlRoot : '/api/exceptiondetails',
        defaults: {
            ExceptionMessage: '',
            ControllerName: '',
            StackTrace: '',
            Date: ''
        },
    });
});