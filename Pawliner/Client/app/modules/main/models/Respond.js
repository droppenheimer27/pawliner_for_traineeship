define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        idAttribute: 'Id',
        urlRoot : '/api/responds',
        defaults: {
            Content: '',
            CreatedAt: '',
            Status: '',
            OrderId: '',
            ExecutorId: '',
            UserId: '',
            Executor: null,
            User: null
        },
    });
});