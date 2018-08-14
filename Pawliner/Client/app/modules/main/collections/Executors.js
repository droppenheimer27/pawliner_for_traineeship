define([
    '../../../collections/RestBasePageble',
    '../models/Executor',
    'bpaginator'
], function (RestBasePageble, Executor) {
    'use strict';

    return RestBasePageble.extend({
        model: Executor,
        url : '/api/executors'
    });
});