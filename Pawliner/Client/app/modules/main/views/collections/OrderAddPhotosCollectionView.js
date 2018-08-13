define([
    'backbone',
    'underscore',
    'marionette',
    '../../collections/Orders',
    '../regions/photos/AddPhotosBlock'
], function (B, _, marionette, Orders, AddPhotosBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        // childView: AddPhotosBlock,
        // initialize: function () {
        //     this.collection.fetch();
        //     console.log(this.collection);
        // },
    });
});
