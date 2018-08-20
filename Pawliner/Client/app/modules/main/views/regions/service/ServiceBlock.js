define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/service/ServiceBlock.html',
    './../../collections/ServiceClassifersCollectionView',
    '../admin/EditServiceBlock',
    '../../../collections/Services'
], function (B, _, $, marionette, template, ServiceClassifersCollectionView, EditServiceBlock, Services) {
    'use strict';

    return marionette.View.extend({
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialiaze: function () {
            this.listenTo(B.Radio.channel('main'), 'refresh', this.render);
            this.listenTo(B.Radio.channel('main'), 'saveRespond', this.saveRespond);
            this.listenTo(B.Radio.channel('main'), 'destroyRespond', this.destroyRespond);
        },
        ui: {
            editService: '#edit-service',
            servicesRegion: '.service-region',
            // editServicesRegion: '.edit-service-block',
        },
        events: {
            'click @ui.editService': 'onClickEditService'
        },
        regions: {
            servicesRegion: {
                el: '@ui.servicesRegion',
                replaceElement: true
            },
            // editServicesRegion: {
            //     el: '@ui.editServicesRegion',
            //     replaceElement: true
            // }
        },
        saveService: function (model) {
            console.log(model, 'saveService')
            var newServiceClassifers = this.model.get('ServiceClassifers');
            newServiceClassifers.push(model);;

            this.model.set({'ServiceClassifers': newServiceClassifers});
            this.model.fetch();
        },
        destroyService: function (id) {
            var newServiceClassifers = _.reject(this.model.get('ServiceClassifers'), function (el) {
                return id == el.Id;
            });
            this.model.set({'ServiceClassifers': newServiceClassifers});
        },
        onClickEditService: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Edit the service',
                bodyText: new EditServiceBlock({model: this.model})
            });
        },
        onRender: function () {
            this.showChildView('servicesRegion', new ServiceClassifersCollectionView({
                collection: new Services(this.model.get('ServiceClassifers'))
            }));

            // if (window.app.model.get('roles') === 'Administrator' && !_.isEmpty(window.app.model.get('userId'))) {
            //     this.showChildView('editServicesRegion', new EditServiceBlock({
            //         model: this.model
            //     }));
            // }
        }
    });
});
