define([
    'underscore',
    'marionette',
    '../regions/service/ServiceListBlock'
], function (_, marionette, ServiceListBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'list-group list-group-flush',
        childView: ServiceListBlock,
    });
});
