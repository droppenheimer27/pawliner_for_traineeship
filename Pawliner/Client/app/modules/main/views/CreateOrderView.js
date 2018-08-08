define([
    'syphon',
    'underscore',
    'jquery',
    'marionette',
    'text!../templates/CreateOrderView.html',
    'modules/main/models/Order',
    'modules/main/collections/Services',
    './collections/SelectServiceCollectionView',
    'css!../../../../vendor/js/air-datepicker/dist/css/datepicker.min',
    'css!../../../../vendor/js/select2/dist/css/select2.min',
    'css!../../../../vendor/css/pawliner',
    'airdatepicker',
    'select2',
], function (syphon, _, $, Mn, template, Order, Services, SelectServiceCollectionView) {
    'use strict';

    return Mn.View.extend({
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model = new Order();
        },
        ui: {
            orderForm: 'form[role="form"]',
            selectServiceRegion: '.select-service-region'
        },
        regions: {
            content: '.content',
            selectServicesRegion: {
                el: '@ui.selectServiceRegion',
                replaceElement: true
            },
        },
        events: {
            'submit @ui.orderForm': 'onSubmitOrderForm'
        },
        // onSync: function() {

        //     $(this.el).select2({
        //         theme: "bootstrap",
        //         allowClear: true,
        //         placeholder: "All "+ this.options.label,
        //         width: "200"
        //     });
        // },
        onSubmitOrderForm: function (e) {
            e.preventDefault();

            var data = syphon.serialize(this.ui.orderForm);
            data.UserId = window.app.model.get('userId');

            console.log(data);

            // this.model.set(data);
            // this.model.save(data);

            // console.log(this.model);
            $.ajax({
                type: 'POST',
                url: '/api/order',
                data: {
                    UserId:  window.app.model.get('userId'),
                    serviceClassiferDescription: $('.paw-select').val(),
                    Header: $('#headerCreateOrder').val(),
                    description: $('#descriptionCreateOrder').val(),
                    city: $('#cityCreateOrder').val(),
                    address: $('#addressCreateOrder').val(),
                    name: $('#nameCreateOrder').val(),
                    CompletedOn: $('#completeDate').val(),
                    price: $('#priceCreateOrder').val(),
                    PhoneNumber: $('#profileNumber').val(),
                },
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    console.log(response);
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
