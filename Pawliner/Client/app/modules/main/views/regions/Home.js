define([
    'backbone',
    'jquery',
    'marionette',
    'text!../../templates/regions/Home.html',
    '../collections/OrderCollectionView',
    '../collections/ServiceCollectionView',
    '../collections/ExecutorCollectionView',
    '../../../../common/views/Paginator',
    '../../../../common/models/Paginator'
], function (B, $, marionette, template, OrderCollectionView, ServiceCollectionView, ExecutorCollectionView, Paginator, PaginatorModel) {
    'use strict';

    return marionette.View.extend({
        ui: {
            orderRegion: '#order-template-region',
            executorRegion: '#executor-template-region',
            serviceRegion: '.service-template-region',
            placeOrder: '#placeOrderView',
            becomeExecutorView: '#becomeExecutorView',
            paginatorOrders: '#paginatorOrders',
            paginatorExecutors: '#paginatorExecutors',
            myOrders: '#my-orders'
        },
        initialize: function () {
        },
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        events: {
            'click @ui.placeOrder': 'isLogin',
            'click @ui.becomeExecutorView': 'isExecutor',
            'clicl @ui.myOrders': 'showMyOrders'
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
            paginatorOrders: {
                el: '@ui.paginatorOrders',
            },
            paginatorExecutors: {
                el: '@ui.paginatorExecutors',
            }
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
        showMyOrders: function (e) {
            e.preventDefault();

            
        },
        onRender: function() {
            var settings = {
                RadioName: 'OrdersEvent'
            };

            this.showChildView('serviceRegion', new ServiceCollectionView());
            this.showChildView('orderRegion', new OrderCollectionView(settings));
            this.showChildView('executorRegion', new ExecutorCollectionView(settings));

            var paginatorModel = new PaginatorModel();
            _.extend(settings, {model: paginatorModel});

            this.showChildView('paginatorOrders', new Paginator(settings));
            this.showChildView('paginatorExecutors', new Paginator(settings));
        },
    });
});
