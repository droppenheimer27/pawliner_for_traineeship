define([
    'backbone',
    'jquery',
    'marionette',
    'text!../../templates/regions/Home.html',
    './order/OrderBlock',
    '../CreateOrderView',
    '../collections/OrderCollectionView',
    '../collections/ServiceCollectionView',
    './service/ServiceBlock',
], function (B, $, marionette, template, OrderBlock, CreateOrderView, OrderCollectionView, ServiceCollectionView, ServiceBlock) {
    'use strict';

    return marionette.View.extend({
        initialize: function() {

        },
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            orderRegion: '#order-template-region',
            serviceRegion: '.service-template-region',
            placeOrder: '.check-login'
        },
        events: {
            'click @ui.placeOrder': 'isLogin'
        },
        regions: {
            orderRegion: {
                el: '@ui.orderRegion',
            },
            serviceRegion: {
                el: '@ui.serviceRegion',
                replaceElement: true
            },
        },
        isLogin: function (e) {

            if (_.isEmpty(window.app.model.get('tokenInfo'))) {
                alert('Please, sign in');
            }
        },
        onRender: function() {

            this.showChildView('orderRegion', new OrderCollectionView());
            this.showChildView('serviceRegion', new ServiceCollectionView());
            // this.showChildView('serviceRegion', new ServiceBlock());
        },
    });
});
