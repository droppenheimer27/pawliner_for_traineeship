define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        url : '/api/account/SetUserInfo'
    });
});