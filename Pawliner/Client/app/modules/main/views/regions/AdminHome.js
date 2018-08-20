define([
    'backbone',
    'jquery',
    'marionette',
    'text!../../templates/regions/AdminHome.html',
    '../ModalView',
    '../AnimatedRegion',
    '../collections/ServiceCollectionView',
    './admin/AddNewServiceBlock',
    './admin/ExecutorTable',
    './admin/ExceptionTable',
    'modules/main/collections/Executors',
    'modules/main/collections/ExceptionsDetails',
], function (B, 
    $, 
    marionette, 
    template, 
    ModalView, 
    AnimatedRegion,
    ServiceCollectionView, 
    AddNewServiceBlock, 
    ExecutorTable, 
    ExceptionTable, 
    Executors, 
    ExceptionsDetails) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.listenTo(B.Radio.channel('main'), 'refresh', this.render);
        },
        ui: {
            addService: '#add-new-service',
            serviceRegion: '.service-template-region',
            executorTableRegion: '.executor-table-region',
            exceptionTableRegion: '.exception-table-region',
        },
        events: {
            'click @ui.addService': 'onClickNewService'
        },
        regions: {
            serviceRegion: {
                el: '@ui.serviceRegion',
                replaceElement: true
            },
            executorTableRegion: {
                el: '@ui.executorTableRegion',
                regionClass: AnimatedRegion
            },
            exceptionTableRegion: {
                el: '@ui.exceptionTableRegion',
                regionClass: AnimatedRegion
            },
        },
        onClickNewService: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Add new service',
                bodyText: new AddNewServiceBlock()
            });
        },
        onRender: function() {
            this.showChildView('serviceRegion', new ServiceCollectionView());
            this.showChildView('executorTableRegion', new ExecutorTable({
                collection: new Executors()
            }));
            this.showChildView('exceptionTableRegion', new ExceptionTable({
                collection: new ExceptionsDetails()
            }));
        },
    });
});
