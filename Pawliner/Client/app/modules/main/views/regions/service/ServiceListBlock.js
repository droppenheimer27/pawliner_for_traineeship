define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/service/ServiceListBlock.html'
], function (B, _, $, marionette, template) {
    'use strict';

    const services = new Array();

    return marionette.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            checkbox: 'input[type="checkbox"]',
        },
        events: {
            'click @ui.checkbox': 'onClickService'
        },
        onClickService: function (e) {
            if ($('#get-service' + this.model.get('Id')).is(':checked')) { 
                services.push(this.model.get('Description'));
            } else {
                services.pop(this.model.get('Description'));
            }

            B.Radio.channel('main').trigger('getOrdersByCheckbox', services);
        },
    });
});
