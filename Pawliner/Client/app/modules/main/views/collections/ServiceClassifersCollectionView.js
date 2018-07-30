define([
    'underscore',
    'marionette',
    '../regions/service/ServiceListBlock'
], function (_, marionette, ServiceListBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'ul',
        childView: ServiceListBlock
    });
});
