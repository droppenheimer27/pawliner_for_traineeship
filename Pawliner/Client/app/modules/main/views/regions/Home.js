define([
    'backbone',
    'jquery',
    'marionette',
    'text!../../templates/regions/Home.html',
    '../collections/OrderCollectionView',
    '../collections/ServiceCollectionView',
    '../collections/ExecutorCollectionView'
], function (B, $, marionette, template, OrderCollectionView, ServiceCollectionView, ExecutorCollectionView) {
    'use strict';

    return marionette.View.extend({
        ui: {
            orderRegion: '#order-template-region',
            executorRegion: '#executor-template-region',
            serviceRegion: '.service-template-region',
            placeOrder: '.check-login'
        },
        initialize: function () {
        },
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        events: {
            'click @ui.placeOrder': 'isLogin'
        },
        regions: {
            orderRegion: {
                el: '@ui.orderRegion',
            },
            executorRegion: {
                el: '@ui.executorRegion',
            },
            serviceRegion: {
                el: '@ui.serviceRegion',
                replaceElement: true
            },
        },
        isLogin: function (e) {
            // e.preventDefault();

            if (_.isEmpty(window.app.model.get('tokenInfo'))) {
                alert('Please, sign in');
            } else {
                // window.router.navigate('#!/main/placeorder', { trigger: true });
            }
        },
        onRender: function() {
            this.showChildView('serviceRegion', new ServiceCollectionView());
            this.showChildView('orderRegion', new OrderCollectionView());
            this.showChildView('executorRegion', new ExecutorCollectionView());
        },
    });
});
