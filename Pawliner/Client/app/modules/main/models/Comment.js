define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        idAttribute: 'Id',
        urlRoot : '/api/comments',
        defaults: {
            Id: '',
            Content: '',
            CreatedAt: '',
            UserId: '', 
            User: null,
            ExecutorId: '',
            Executor: null,
        },
    });
});