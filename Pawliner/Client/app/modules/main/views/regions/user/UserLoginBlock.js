define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/user/UserLoginBlock.html'
], function (_, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            loginForm: "#loginForm",
        },
        events: {
            "submit @ui.loginForm": "onSubmitLoginForm",
        },
        validateForm: function () {
            this.ui.loginForm.validate({
               ignore: ':hidden',
               rules: {
                    UserName: {
                       required: true
                   },
                    Password: {
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
                   if(element.parent('.form-group').length) {
                       error.insertAfter(element.parent());
                   } else {
                       error.insertAfter(element);
                   }
               }
           });
        },
        onSubmitLoginForm: function (e) {
            e.preventDefault();

            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: '/Token',
                data: {
                    grant_type: 'password',
                    username: $("#usernameLogin").val(),
                    password: $("#passwordLogin").val()
                },
                success: function (response) {
                    var args = {
                        tokenInfo: response.access_token,
                        userId: response.id,
                        roles: response.roles
                    };
                    
                    window.app.model.set(args);
                    window.app.model.save(args);
                    
                    $('#model-login').modal('show'); 
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
