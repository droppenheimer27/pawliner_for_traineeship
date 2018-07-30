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
                    var tokenInfo = {tokenInfo: response.access_token};
                    var userId = {userId: response.id};
                    window.app.model.set(userId);
                    window.app.model.save(userId);

                    window.app.model.set(tokenInfo);
                    window.app.model.save(tokenInfo);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
    });
});
