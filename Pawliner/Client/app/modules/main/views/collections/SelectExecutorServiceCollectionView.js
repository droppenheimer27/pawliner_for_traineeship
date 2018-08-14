define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    '../regions/service/SelectServiceBlock',
    'modules/main/models/Service',
    'css!../../../../../vendor/js/AdminLTE/plugins/select2/select2.min',
    'select2'
], function (B, _, $, marionette, SelectServiceBlock, Service) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'select',
        className: 'form-control select2 paw-select',
        attributes: {
            multiple: 'multiple',
            name: 'ServiceClassifersIds'
        },
        childView: SelectServiceBlock,
        initialize: function () {
            this.collection.fetch();
        },
        onAttach: function () {
            this.$el.select2({
                tags: true,
                allowClear: true,
                width: '100%'
            });
        },
    });
});
