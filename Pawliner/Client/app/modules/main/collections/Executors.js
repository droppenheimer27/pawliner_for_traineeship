define([
    'backbone',
    '../models/Executor',
    'bpaginator'
], function (B, Executor) {
    'use strict';

    return B.Collection.extend({
        model: Executor,
        url : '/api/executors'
    });
});