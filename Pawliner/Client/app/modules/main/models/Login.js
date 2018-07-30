define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        defaults: {
          username: '',
          password: ''
        },
        urlRoot: '/Token'
    });
});