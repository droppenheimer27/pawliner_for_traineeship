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
            User: {
                Photo: {
                    Path: ''
                }
            },
            ExecutorId: '',
            Executor: {},
        },
    });
});