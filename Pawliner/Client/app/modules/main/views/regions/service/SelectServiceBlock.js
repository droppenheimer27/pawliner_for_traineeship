define([
    'underscore',
    'jquery',
    'backbone',
    'marionette',
    './OptionServiceBlock',
], function (_, $, B, marionette, childView) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'optgroup',
        template: false,
        childView: childView,
        attributes: function() {
            return {
                label: this.model.get("Description")
            };
        },
        initialize: function(){
            this.collection = new B.Collection(this.model.get('ServiceClassifers'))
        }
    });
});
