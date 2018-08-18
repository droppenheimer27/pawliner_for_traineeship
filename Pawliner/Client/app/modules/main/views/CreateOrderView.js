define([
    'backbone',
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
    'jqueryvalidate'
], function (B, syphon, _, $, Mn, template, Order, Services, SelectServiceCollectionView) {
    'use strict';

    return Mn.View.extend({
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.listenTo(B.Radio.channel('main'),'refresh', this.render);
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
        validateForm: function () {
            this.ui.orderForm.validate({
               ignore: ':hidden',
               rules: {
                   Header: {
                       required: true,
                       maxlength: 256
                   },
                   Description: {
                        required: true
                    },
                    City: {
                        required: true,
                        maxlength: 128
                    },
                    Address: {
                        required: false,
                        maxlength: 128
                    },
                    Name: {
                        required: true,
                        maxlength: 128
                    },
                    CompletedOn: {
                        required: true,
                        date: true
                    },
                    Price: {
                        maxlength: 64,
                        digits: true
                    },
                    PhoneNumber: {
                        required: true,
                        maxlength: 32
                    },
                    ServiceClassiferDescription: {
                        required: true,
                        maxlength: 128
                    },
               },
               highlight: function(element) {
                   $(element).closest('.form-group').addClass('has-error');
               },
               unhighlight: function(element) {
                   $(element).closest('.form-group').removeClass('has-error');
               },
               errorElement: 'span',
               errorClass: 'help-block',
               errorPlacement: function(error, element) {
                   if(element.parent('.form-group').length) {
                       error.insertAfter(element.parent());
                   } else {
                       error.insertAfter(element);
                   }
               }
           });
        },
        onSubmitOrderForm: function (e) {
            e.preventDefault();

            var data = syphon.serialize(this.ui.orderForm);
            data.UserId = window.app.model.get('userId');

            if ($('#fancy-checkbox-success:checked').val() === 'on') {
                data.Price = 'Deal';
            }

            $.ajax({
                type: 'POST',
                url: '/api/order',
                data: data,
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    $('#modal-order-success').modal('show');
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

            if (_.isEmpty(window.app.model.get('userId'))) {
                window.router.navigate('', { trigger: true });
            }

            this.validateForm();
        }
    });
});
