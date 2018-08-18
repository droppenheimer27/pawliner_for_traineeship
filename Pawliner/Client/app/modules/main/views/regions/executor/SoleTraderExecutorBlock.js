define([
    'backbone',
    'syphon',
    'underscore',
    'marionette',
    'text!../../../templates/regions/executor/SoleTraderExecutorBlock.html',
    '../../collections/SelectExecutorServiceCollectionView',
    'modules/main/collections/Services',
    'modules/main/models/Executor'
], function (B, syphon, _, marionette, template, SelectExecutorServiceCollectionView, Services, Executor) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model = new Executor();
        },
        ui: {
            soleTraderForm: '#soleTraderForm',
            selectServiceRegion: '.select-executor-service-region',
            executorServicesRegion: '.executor-services-region'
        },
        regions: {
            content: '.content',
            selectServicesRegion: {
                el: '@ui.selectServiceRegion',
                replaceElement: true
            },
            executorServicesRegion: {
                el: '@ui.executorServicesRegion',
                replaceElement: true
            },
        },
        events: {
            'submit @ui.soleTraderForm': 'onSubmitSoleTraderForm'
        },
        validateForm: function () {
            this.ui.soleTraderForm.validate({
               ignore: ':hidden',
               rules: {
                    FirstName: {
                       required: true,
                       maxlength: 128
                    },
                    LastName: {
                        required: true,
                        maxlength: 128
                    },
                    Patronymic: {
                        required: true,
                        maxlength: 128
                    },
                    Description: {
                        required: true
                    },
                    PayerAccountNumber: {
                        required: true,
                        digits: true
                    },
                    PhoneNumber: {
                        required: true,
                        maxlength: 32
                    },
               },
               highlight: function (element) {
                   $(element).closest('.form-group').addClass('has-error');
               },
               unhighlight: function (element) {
                   $(element).closest('.form-group').removeClass('has-error');
               },
               errorElement: 'span',
               errorClass: 'help-block',
               errorPlacement: function (error, element) {
                   if (element.parent('.form-group').length) {
                       error.insertAfter(element.parent());
                   } else {
                       error.insertAfter(element);
                   }
               }
           });
        },
        onSubmitSoleTraderForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.soleTraderForm);
            data.Type = this.options.type;
            data.UserId = window.app.model.get('userId');
            data.Status = 2;

            this.model.set(data);
            this.model.save(data);

            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: '/api/account/SetUserRole',
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    var roles = {roles: 'Executor'};
                    window.app.model.set(roles);
                    window.app.model.save(roles);

                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'success',
                        headerText: 'Success',
                        bodyText: 'Successfuly created executor profile!'
                    });
                }
            });
        },
        onRender: function () {
            this.showChildView('selectServicesRegion', new SelectExecutorServiceCollectionView({
                collection: new Services()
            }));

            this.validateForm();
        }
    });
});
