define([
    'backbone',
    'syphon',
    'underscore',
    'marionette',
    'text!../../../templates/regions/executor/EditNaturalExecutorBlock.html',
    '../../collections/SelectExecutorServiceCollectionView',
    'modules/main/collections/Services'
], function (B, syphon, _, marionette, template, SelectExecutorServiceCollectionView, Services) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            selectServicesRegion: '.select-executor-service-region',
            form: 'form[role="form"]',
            removeNaturalExecutor: '#removeNaturalExecutor'
        },
        regions: {
            selectServicesRegion: {
                el: '@ui.selectServicesRegion',
                replaceElement: true
            },
        },
        events: {
            'submit @ui.form': 'onSubmitEditNaturalExecutorForm',
            'click @ui.removeNaturalExecutor': 'onClickRemoveNaturalExecutor'
        },
        validateForm: function () {
            this.ui.form.validate({
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
        onSubmitEditNaturalExecutorForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.form);
            data.Id = this.model.get('Id');
            data.Type = 'NP';
            
            this.model.set(data);
            this.model.save(data, {
                success: function () {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('refresh');
                },
            })
        },
        onClickRemoveNaturalExecutor: function (e) {
            e.preventDefault();

            $.ajax({
                type: 'DELETE',
                url: '/api/executors/' + this.model.get('Id'),
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('refresh');
                },
                error: function (response) {
                    console.log(response);
                }
            });

            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: '/api/account/RemoveUserRole',
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    var roles = {roles: ''};
                    window.app.model.set(roles);
                    window.app.model.save(roles);

                    window.router.navigate('#!/main/profile', { trigger: true });
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
