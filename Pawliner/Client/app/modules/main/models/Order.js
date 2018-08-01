define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        idAttribute: 'Id',
        urlRoot : '/api/order',
        defaults: {
            Id: '', // remove
            Header: '',
            Description: '',
            Price: '',
            CompletedOn: ''
        }
    });
});