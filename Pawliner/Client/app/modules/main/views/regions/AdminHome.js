define([
    'backbone',
    'jquery',
    'marionette',
    'text!../../templates/regions/AdminHome.html',
    '../collections/ServiceCollectionView',
    './admin/AddNewServiceBlock'
], function (B, $, marionette, template, ServiceCollectionView, AddNewServiceBlock) {
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
            addNewService: '.add-new-service-region'
        },
        regions: {
            serviceRegion: {
                el: '@ui.serviceRegion',
                replaceElement: true
            },
            addNewService: {
                el: '@ui.addNewService'
            }
        },
        refreshAdminView: function () {
            this.render();
        },
        onRender: function() {
            this.showChildView('serviceRegion', new ServiceCollectionView());
            this.showChildView('addNewService', new AddNewServiceBlock());
        },
    });
});
