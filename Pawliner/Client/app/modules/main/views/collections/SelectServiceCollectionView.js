define([
    'underscore',
    'marionette',
    '../regions/service/SelectServiceBlock'
], function (_, marionette, SelectServiceBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'select',
        className: 'form-control select2',
        childView: SelectServiceBlock,
        initialize: function () {
            this.collection.fetch();
        }
    });
});
