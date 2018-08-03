define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        idAttribute: 'Id',
        urlRoot : '/api/executors',
        defaults: {
            Id: '', 
            Description: '',
            FirstName: '',
            LastName: '',
            Patronymic: '',
            Services: []
        },
    });
});