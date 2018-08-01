define([
    'underscore',
    'jquery',
    'marionette',
    'modules/main/collections/Services',
    '../regions/service/OptionServiceBlock',
], function (_, $, marionette, Services, OptionServiceBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'option',
        childView: OptionServiceBlock
    });
});
