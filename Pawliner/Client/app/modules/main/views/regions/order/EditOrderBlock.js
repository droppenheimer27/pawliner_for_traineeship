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
    'jqueryvalidate'
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
        validateForm: function () {
            this.ui.form.validate({
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
        changeModel: function () {
            $('#model-order-put').modal('hide');
        },
        onSubmitEditOrderForm: function (e) {
            e.preventDefault();
            var data = syphon.serialize(this.ui.form);
            
            if ($('#fancy-checkbox-success-edit:checked').val() === 'on') {
                data.Price = 'Deal';
            }
            this.model.set(data);
            this.model.save(data);            
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
                    
                    window.router.navigate('', { trigger: true });
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
        onRender: function () {
            this.showChildView('selectServicesRegion', new SelectServiceCollectionView({
                collection: new Services(),
                selectedValue: this.model.get("ServiceClassiferDescription")
            }));

            this.validateForm();
        }
    });
});
