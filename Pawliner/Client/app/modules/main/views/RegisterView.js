define([
    'underscore',
    'jquery',
    'marionette',
    'text!../templates/RegisterView.html',
], function (_, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        initialize: function() {
            console.log('initialize Register');
        },
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
        onSubmitRegisterForm: function (e) {
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: '/api/account/Register',
                data: {
                    UserName:  $('#login').val(),
                    Email:  $('#email').val(),
                    Password: $('#password').val(),
                    ConfirmPassword: $('#confirmPassword').val()
                },
                success: function (response) {
                    // var tokenInfo = {tokenInfo: response.access_token};
                    // var userId = {userId: response.id};
                    // window.app.model.set(userId);
                    // window.app.model.save(userId);

                    // window.app.model.set(tokenInfo);
                    // window.app.model.save(tokenInfo);
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
    });
});
