define([
    'backbone',
    'underscore',
    'marionette',
    './ExceptionRow',
    './ExceptionBlock'
], function (B, _, marionette, ExceptionRow, ExceptionBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'tbody',
        childView: ExceptionRow,
        initialize: function () {
            this.collection.fetch();
        },
    });
});
