define([
    'underscore',
    'jquery',
    'marionette',
    '../regions/service/SelectServiceBlock',
    'css!../../../../../vendor/js/AdminLTE/plugins/select2/select2.min',
    'select2',
], function (_, $, marionette, SelectServiceBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'select',
        className: 'form-control select2 paw-select',
        attributes: {
            name: 'ServiceClassiferDescription'
        },
        childView: SelectServiceBlock,
        initialize: function () {
            this.collection.fetch();
        },
        onAttach: function () {
            $(this.el).select2({
                tags: true,
            });
        }
        // onRender: function () {
        //     $(this.el).select2({
        //         theme: "bootstrap",
        //         allowClear: true,
        //         width: "200"
        //     });
        // }
    });
});
