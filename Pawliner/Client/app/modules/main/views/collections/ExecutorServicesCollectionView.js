define([
    'underscore',
    'marionette',
    '../regions/service/ExecutorServiceListBlock'
], function (_, marionette, ExecutorServiceListBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group',
        childView: ExecutorServiceListBlock
    });
});
