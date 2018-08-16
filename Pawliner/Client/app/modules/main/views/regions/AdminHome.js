define([
    'backbone',
    'jquery',
    'marionette',
    'text!../../templates/regions/AdminHome.html',
    '../ModalView',
    '../collections/ServiceCollectionView',
    './admin/AddNewServiceBlock',
    './admin/ExecutorTable',
    './admin/ExceptionTable',
    'modules/main/collections/Executors',
    'modules/main/collections/ExceptionsDetails'
], function (B, $, marionette, template, ModalView, ServiceCollectionView, AddNewServiceBlock, ExecutorTable, ExceptionTable, Executors, ExceptionsDetails) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.listenTo(B.Radio.channel('main'), 'refreshAdminView', this.refreshAdminView);
        },
        ui: {
            serviceRegion: '.service-template-region',
            addNewService: '.add-new-service-region',
            executorTableRegion: '.executor-table-region',
            exceptionTableRegion: '.exception-table-region'
        },
        regions: {
            modalui: {
                el: '#modalui'
            },
            serviceRegion: {
                el: '@ui.serviceRegion',
                replaceElement: true
            },
            addNewService: {
                el: '@ui.addNewService'
            },
            executorTableRegion: {
                el: '@ui.executorTableRegion'
            },
            exceptionTableRegion: {
                el: '@ui.exceptionTableRegion'
            }
        },
        refreshAdminView: function () {
            this.render();
        },
        onRender: function() {
            this.showChildView('serviceRegion', new ServiceCollectionView());
            this.showChildView('executorTableRegion', new ExecutorTable({
                collection: new Executors()
            }));
            this.showChildView('exceptionTableRegion', new ExceptionTable({
                collection: new ExceptionsDetails()
            }));
            this.showChildView('addNewService', new AddNewServiceBlock());

            this.showChildView('modalui', new ModalView());
        },
    });
});
