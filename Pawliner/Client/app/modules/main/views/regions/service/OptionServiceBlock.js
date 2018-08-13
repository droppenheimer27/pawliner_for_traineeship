define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/service/SelectServiceBlock.html'
], function (_, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        tagName: 'option',
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        attributes: function() {
            var attrs = {
                value: this.model.get("Id")   
            };
            // console.log(this.options.selectedValue, 'this.options.selectedValue');
            // console.log(this.model.get("Id"), 'this.model.get("Id")');
            if (this.model.get("Id") == this.options.selectedValue){
                _.extend(attrs, {selected: 'selected'})
            }
            return attrs;
        },
    });
});
