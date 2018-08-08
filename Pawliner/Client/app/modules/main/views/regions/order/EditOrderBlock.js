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
        ui: {
            selectServiceRegion: '.select-service-region',
            form: 'form[role="form"]',
            removeOrder: '#removeOrder'
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
        onSubmitEditOrderForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.form);
            data.Id = this.model.get('Id');
            console.log(data); 

            var order = new Order();
            order.set(data);
            order.save(data, {
                success: function () {
                    $('#model-order-put').modal('hide');
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
            this.showChildView('selectServicesRegion', new SelectServiceCollectionView({
                collection: new Services()
            }));
        }
    });
});
