define([
    'backbone',
    'underscore',
    'marionette',
    '../regions/comment/CommentBlock'
], function (B, _, marionette, CommentBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        childView: CommentBlock
    });
});