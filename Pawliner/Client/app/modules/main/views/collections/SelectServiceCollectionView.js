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
            id: 'ServiceClassiferDescription',
            name: 'ServiceClassiferDescription'
        },
        childView: SelectServiceBlock,
        childViewOptions: function() {
            // console.log(this.selectedValue, 'this.selectedValue12');
            // console.log(this.options.selectedValue, 'this.options.selectedValue12');
            return {selectedValue: this.options.selectedValue};
        },
        initialize: function () {
            this.collection.fetch();
        },
        onAttach: function () {
            this.$el.select2({
                tags: true,
                allowClear: true,
                width: "100%"
            });
        }
    });
});
