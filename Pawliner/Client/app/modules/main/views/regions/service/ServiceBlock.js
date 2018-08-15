define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/service/ServiceBlock.html',
    './../../collections/ServiceClassifersCollectionView',
    '../admin/EditServiceBlock',
    '../../../collections/Services'
], function (_, $, marionette, template, ServiceClassifersCollectionView, EditServiceBlock, Services) {
    'use strict';

    return marionette.View.extend({
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            servicesRegion: '.service-region',
            editServicesRegion: '.edit-service-block',
        },
        regions: {
            servicesRegion: {
                el: '@ui.servicesRegion',
                replaceElement: true
            },
            editServicesRegion: {
                el: '@ui.editServicesRegion',
                replaceElement: true
            }
        },
        onRender: function () {
            this.showChildView('servicesRegion', new ServiceClassifersCollectionView({
                collection: new Services(this.model.get('ServiceClassifers'))
            }));

            if (window.app.model.get('roles') === 'Administrator' && !_.isEmpty(window.app.model.get('userId'))) {
                this.showChildView('editServicesRegion', new EditServiceBlock({
                    model: this.model
                }));
            }
        }
    });
});
