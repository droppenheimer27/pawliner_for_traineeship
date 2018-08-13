define([
    'underscore',
    'jquery',
    'backbone',
    'marionette',
    './OptionServiceBlock'
], function (_, $, B, marionette, childView) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'optgroup',
        template: false,
        childView: childView,
        childViewOptions: function() {
            // console.log(this.options.selectedValue, 'this.options.selectedValue000');
            return {selectedValue: this.options.selectedValue};
        },
        attributes: function() {
            return {
                label: this.model.get("Description")
            };
        },
        initialize: function() {
            this.collection = new B.Collection(this.model.get('ServiceClassifers'));
            // B.Radio.channel('main').reply('onSelect', this.onSelect)
        },
        // onSelect: function (serviceDescriptions) {
        //     var self = this;
        //     var keys = Object.keys(this.model.get('ServiceClassifers'));
        //     var services = {};

        //     keys.forEach(function (key) {
        //         if (serviceDescriptions.ServiceClassifers.includes(self.model.get('ServiceClassifers')[key].Description)) {
        //             services.ServiceClassifers = self.model.get('ServiceClassifers')[key]
        //         }
        //     });
        //     return services;
        // },
    });
});
