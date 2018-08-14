define([
    'underscore',
    'marionette',
    '../regions/photos/PhotosBlock',
    'css!../../../../../vendor/js/jgallery/dist/css/jgallery.min',
    'jGallery',
    'touchswipe'
], function (_, marionette, PhotosBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        childView: PhotosBlock,
        className: 'text-black',
        attributes: {
            id: '#gallery',
            style: 'margin-top: 30px'
        },
        onAttach: function () {
            this.$el.jGallery();
        },
    });
});
