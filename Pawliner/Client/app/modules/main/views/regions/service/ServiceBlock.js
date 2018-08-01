define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/service/ServiceBlock.html',
    './../../collections/ServiceClassifersCollectionView',
    '../../../collections/Services'
], function (_, $, marionette, template, ServiceClassifersCollectionView, Services) {
    'use strict';

    return marionette.View.extend({
        template: function (tplPrms) {
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
            this.showChildView('servicesRegion', new ServiceClassifersCollectionView({
                collection: new Services(this.model.get('ServiceClassifers'))
            }));
        }
    });
});
