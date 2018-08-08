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
                    var args = {
                        tokenInfo: response.access_token,
                        userId: response.id,
                        roles: response.roles
                    };
                    
                    window.app.model.set(args);
                    window.app.model.save(args);
                    
                    // B.Radio.channel('main').trigger('showRespondBlock');
                    // window.app.model.set(roles);
                    // window.app.model.save(roles);

                    // window.app.model.set(tokenInfo);
                    // window.app.model.save(tokenInfo);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
    });
});
