define([
    'underscore',
    'jquery',
    'marionette',
    'text!../templates/CreateOrderView.html',
    'modules/main/models/Order',
    'modules/main/collections/Services',
    'css!../../../../vendor/js/air-datepicker/dist/css/datepicker.min',
    'css!../../../../vendor/js/select2/dist/css/select2.min',
    'airdatepicker',
    'select2'
], function (_, $, Mn, template, Order, Services) {
    'use strict';

    return Mn.View.extend({
        initialize: function() {
            this.collection = new Services();
            this.collection.fetch();
            console.log(this.collection);

            // var option = new Option(this.collection, false, false);
            // $('#select').append(option).trigger('change');
        },
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            orderForm: '#orderForm'
        },
        regions: {
            content: '.content'
        },
        events: {
            'submit @ui.orderForm': 'onSubmitOrderForm'
        },
        onSubmitOrderForm: function (e) {
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/api/order',
                data: {
                    UserId:  window.app.model.get('userId'),
                    service: $('#serviceCreateOrder').val(),
                    header: $('#headerCreateOrder').val(),
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


        }
    });
});
