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
            placeOrder: '#placeOrderView',
            becomeExecutorView: '#becomeExecutorView',
        },
        initialize: function () {
        },
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        events: {
            'click @ui.placeOrder': 'isLogin',
            'click @ui.becomeExecutorView': 'isExecutor'
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
            e.preventDefault();

            if (_.isEmpty(window.app.model.get('tokenInfo'))) {
                $('#model-user-login').modal('show');
            } else {
                window.router.navigate('#!/main/placeorder', { trigger: true });
            }
        },
        isExecutor: function (e) {
            e.preventDefault();

            if (_.isEmpty(window.app.model.get('tokenInfo'))) {
                $('#model-user-login').modal('show');
            } else if (window.app.model.get('roles') === 'Executor') {
                $('#model-executor').modal('show');
            } else {
                window.router.navigate('#!/main/becomeexecutor', { trigger: true });
            }
        },
        onRender: function() {
            this.showChildView('serviceRegion', new ServiceCollectionView());
            this.showChildView('orderRegion', new OrderCollectionView());
            this.showChildView('executorRegion', new ExecutorCollectionView());
        },
    });
});
