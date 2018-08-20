define([
    'backbone',
    'syphon',
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/admin/EditServiceBlock.html',
    '../../collections/EditServiceClassifersCollectionView'
], function (B, syphon, _, $, marionette, template, EditServiceClassifersCollectionView) {
    'use strict';

    return marionette.View.extend({
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            serviceClassifersRegion: '.service-classifers-region',
            form: 'form[role="form"]',
            removeService: '#removeService',
            createInputButton: '#createInputButton',
            removeInputButton: '#removeInputButton'
        },
        regions: {
            serviceClassifersRegion: {
                el: '@ui.serviceClassifersRegion',
                replaceElement: true
            },
        },
        events: {
            'submit @ui.form': 'onSubmitEditServiceForm',
            'click @ui.removeService': 'onClickRemoveServiceForm',
            'click @ui.createInputButton': 'onClickCreateInputButton',
            'click @ui.removeInputButton': 'onClickRemoveInputButton'
            
        },
        validateForm: function () {
            this.ui.form.validate({
               ignore: ':hidden',
               rules: {
                   Description: {
                       required: false,
                       minlength: 2
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
                   if (element.parent('.form-group').length) {
                       error.insertAfter(element.parent());
                   } else {
                       error.insertAfter(element);
                   }
               }
           });
        },
        onClickCreateInputButton: function (e) {
            e.preventDefault();

            var input = '<input placeholder="Description" name="ServiceClassifer" class="form-control" type="text" style="margin-left: 35px;margin-top: 20px; width: 350px"/>';
            $('#after-this' + this.model.get('Id')).after(input);  
        },
        // onClickRemoveInputButton: function (e) {
        //     e.preventDefault();
            
        //     var services = [];
        //     $(this.ui.form).find('input, select').not('[type="submit"]').each(function() {
        //         services.push($(this).val());
        //     });

        //    $(this.ui.form).find('input, select').not('[type="submit"]').each(function() {
        //         if ($(this).val() === services[services.length - 1]) {
        //             $(this).remove();
        //         }
        //     });
            
        // },
        onSubmitEditServiceForm: function (e) {
            e.preventDefault();
            
            var data = {};
            var description = $('#editServiceDescrtiption' + this.model.get('Id')).val();
            var services = [];
            data.Description = description;
            data.Id = this.model.get('Id');
            
            $(this.ui.form).find('input, select').not('[type="submit"]').each(function() {
                 services.push($(this).val());
            });
            services.shift();
            data.ServiceClassifersDescriptions = services;

            this.model.set(data);
            this.model.save(data, {
                success: function (model, response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('refresh');
                }
            });
        },
        onClickRemoveServiceForm: function (e) {
            e.preventDefault();
            var self = this;

            this.model.destroy({
                success: function () {
                    B.Radio.channel('main').trigger('destroyService', self.model.get('Id'));
                },
                error: function (model, response, error) {
                    console.log(error);
                    var error = ((_.has(response, 'responseText')) ? response.responseJSON.ModelState.Error[0] : 'Unknown error');
                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'error',
                        headerText: 'Error',
                        bodyText: error
                    });
                }
            });

            B.Radio.channel('main').trigger('messageuihide');
            B.Radio.channel('main').trigger('refresh');
        },
        onRender: function () {

            this.showChildView('serviceClassifersRegion', new EditServiceClassifersCollectionView({
                collection: new B.Collection(this.model.get('ServiceClassifers'))
            }));

            this.validateForm();
        }
    });
});
