define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/service/ServiceBlock.html',
    './ServiceListBlock',
    './../../collections/ServiceClassifersCollectionView',
    '../../../collections/Services'
], function (_, marionette, template, ServiceListBlock, ServiceClassifersCollectionView, Services) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            servicesRegion: '.service-region',
        },
        regions: {
            servicesRegion: {
                el: '@ui.servicesRegion',
                replaceElement: true
            }
        },
        onRender: function () {
            // console.log(this.model, 'ServiceBlock');
            var services = this.model.get('ServiceClassiferTransport');
            // if (services.)
            this.showChildView('servicesRegion', new ServiceClassifersCollectionView({
                collection: new Services(this.model.get('ServiceClassifers'))
            }));
        }
    });
});
