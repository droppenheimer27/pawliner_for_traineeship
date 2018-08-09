define([
    'backbone',
    '../models/Comment'
], function (B, Comment) {
    'use strict';

    return B.Collection.extend({
        model: Comment,
        url : '/api/comments'
    });
});