define([
    'backbone',
    'underscore',
    'syphon',
    'jquery',
    'marionette',
    'text!../templates/RegisterView.html',
], function (B, _, syphon, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            registerForm: "#registerForm",
        },
        regions: {
            content: '.content'
        },
        events: {
            "submit @ui.registerForm": "onSubmitRegisterForm",
        },
        validateForm: function () {
            this.ui.registerForm.validate({
               ignore: ':hidden',
               rules: {
                    UserName: {
                       required: true,
                       minlength: 6,
                       maxlength: 256
                   },
                   Email: {
                        required: true,
                        email: true
                    },
                    Password: {
                        minlength: 6,
                    },
                    ConfirmPassword: {
                        minlength: 6,
                        equalTo: '#registerPassword'
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
        onSubmitRegisterForm: function (e) {
            e.preventDefault();

            var data = syphon.serialize(this.ui.registerForm);

            $.ajax({
                type: 'POST',
                url: '/api/account/Register',
                data: data,
                success: function () {
                    $('#model-register').modal('show');
                },
                error: function (response) {
                    var error = ((_.has(response, 'responseText')) ? response.responseJSON.ModelState : 'Unknown error');
                    var message = _.first(_.values(error)).join('\n');
                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'danger',
                        headerText: 'Error',
                        bodyText: message
                    });
                }
            });
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
