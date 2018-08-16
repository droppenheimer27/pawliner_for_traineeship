define([
    'underscore',
    'marionette',
    './ExecutorRow'
], function (_, marionette, RowView) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'tbody',
        childView: RowView,
        initialize: function () {
            this.collection.fetch();
        }
    });
});
