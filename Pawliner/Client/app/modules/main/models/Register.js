define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        url: '/api/Account/Register'
    });
});