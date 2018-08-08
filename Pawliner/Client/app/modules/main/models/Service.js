define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        idAttribute: 'Id',
        urlRoot : '/api/services',
        defaults: {
            Id: '',
            Description: ''
        }
    });
});