define([
    'backbone',
    'jquery',
    'marionette',
    'text!../../templates/regions/Home.html',
    '../collections/OrderCollectionView',
    '../collections/ServiceCollectionView',
    '../collections/ExecutorCollectionView',
    '../../../../common/views/Paginator',
    '../../../../common/models/Paginator',
    '../AnimatedRegion'
], function (B, $, marionette, template, OrderCollectionView, ServiceCollectionView, ExecutorCollectionView, Paginator, PaginatorModel, AnimatedRegion) {
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
            this.listenTo(B.Radio.channel('main'), 'refresh', this.render);
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
                regionClass: AnimatedRegion
            },
            executorRegion: {
                el: '@ui.executorRegion',
                regionClass: AnimatedRegion
            },
            serviceRegion: {
                el: '@ui.serviceRegion',
                replaceElement: true
            },
            paginatorOrders: {
                el: '@ui.paginatorOrders',
                regionClass: AnimatedRegion
            },
            paginatorExecutors: {
                el: '@ui.paginatorExecutors',
                regionClass: AnimatedRegion
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
        onRender: function () {
            var settings = {
                RadioName: 'OrdersEvent'
            };

            var executorSettings = {
                RadioName: 'ExecutorsEvent',
                Status: 1
            };

            this.showChildView('serviceRegion', new ServiceCollectionView());
            this.showChildView('orderRegion', new OrderCollectionView(settings));
            this.showChildView('executorRegion', new ExecutorCollectionView(executorSettings));

            // var paginatorModel = new PaginatorModel();
            // _.extend(settings, {model: paginatorModel});

            var ordersPaginatorModel = new PaginatorModel();
            _.extend(settings, {model: ordersPaginatorModel});
            var executorsPaginatorModel = new PaginatorModel();
            _.extend(executorSettings, {model: executorsPaginatorModel});

            this.showChildView('paginatorOrders', new Paginator(settings));
            this.showChildView('paginatorExecutors', new Paginator(executorSettings));
        },
    });
});
