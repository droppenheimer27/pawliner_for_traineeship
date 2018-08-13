define([
    'backbone',
    'syphon',
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/order/EditOrderBlock.html',
    'modules/main/collections/Services',
    'modules/main/models/Order',
    '../../collections/SelectServiceCollectionView',
    'css!../../../../../../vendor/js/air-datepicker/dist/css/datepicker.min',
    'css!../../../../../../vendor/js/select2/dist/css/select2.min',
    'css!../../../../../../vendor/css/pawliner',
    'airdatepicker',
    'select2',
], function (B, syphon, _, $, marionette, template, Services, Order, SelectServiceCollectionView) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model.on('change', this.changeModel, this);
        },
        ui: {
            selectServiceRegion: '.select-service-region',
            form: 'form[role="form"]',
            removeOrder: '#removeOrder',
            profileEditClose: '#profileEditClose',
            // modal: '#model-order-put'
        },
        regions: {
            selectServicesRegion: {
                el: '@ui.selectServiceRegion',
                replaceElement: true
            },
        },
        events: {
            'submit @ui.form': 'onSubmitEditOrderForm',
            'click @ui.removeOrder': 'onClickRemoveOrder'
        },
        changeModel: function () {
            $('#model-order-put').modal('hide');
        },
        onSubmitEditOrderForm: function (e) {
            e.preventDefault();
            var self = this;
            var data = syphon.serialize(this.ui.form);
            // data.Id = this.model.get('Id');
            console.log(data); 

            
            this.model.set(data);
            this.model.save(data, {
                success: function () {
                    console.log("ddddd");
                    // $(self.ui.profileEditClose).click();
                    // $(self.ui.modal).modal('hide');
                },
                error: function (a1,a2,a3) {
                    console.log(a1, "eeeee");
                    console.log(a2, "eeeee");
                    console.log(a3, "eeeee");
                    // $(self.ui.profileEditClose).click();
                    // $(self.ui.modal).modal('hide');
                }
            });

            
        },
        onClickRemoveOrder: function (e) {
            e.preventDefault();

            $.ajax({
                type: 'DELETE',
                url: '/api/order/' + this.model.get('Id'),
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    $('#model-order-put').modal('hide');
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
        onRender: function () {
            // console.log(this.model.get("ServiceClassiferDescription"), '-----this.model.get("ServiceClassiferDescription")');
            this.showChildView('selectServicesRegion', new SelectServiceCollectionView({
                collection: new Services(),
                selectedValue: this.model.get("ServiceClassiferDescription")
            }));
        }
    });
});
