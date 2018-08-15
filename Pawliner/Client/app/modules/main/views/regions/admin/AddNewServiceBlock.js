define([
    'backbone',
    'syphon',
    'jquery',
    'marionette',
    'text!../../../templates/regions/admin/AddNewServiceBlock.html',
    'modules/main/models/Service'
], function (B, syphon, $, marionette, template, Service) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            addServiceForm: 'form[role="form"]'
        },
        events: {
            'submit @ui.addServiceForm': 'onSubmitAddServiceForm',
        },
        validateForm: function () {
            this.ui.addServiceForm.validate({
               ignore: ':hidden',
               rules: {
                   Description: {
                       required: true
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
        onSubmitAddServiceForm: function (e) {
            e.preventDefault();
            var data = syphon.serialize(this.ui.addServiceForm);

            this.model = new Service();
            this.model.set(data);
            this.model.save(data, {type: 'POST'}, {
                success: function () {
                    $('#model-service-add').modal('hide');
                }
            });
            
            B.Radio.channel('main').trigger('refreshData');
            B.Radio.channel('main').trigger('refreshAdminView');
        },
        onRender: function () {
           this.validateForm();
        }
    });
});
