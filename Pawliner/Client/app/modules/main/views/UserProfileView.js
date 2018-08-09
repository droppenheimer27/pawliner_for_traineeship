define([
    'syphon',
    'jquery',
    'marionette',
    'text!../templates/UserProfileView.html'
], function (syphon, $, marionette, template) {
    'use strict';
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            var self = this;

            $.ajax({
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                url: '/api/account/UserInfo',
                beforeSend: function (xhr) {

                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    syphon.deserialize(self.ui.profileForm, response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
        ui: {
            profileForm: 'form[role="form"]',
        },
        events: {
            'submit @ui.profileForm': 'onSubmitProfileForm'
        },
        onSubmitProfileForm: function (e) {
            e.preventDefault();

            var data = syphon.serialize(this.ui.profileForm);

            $.ajax({
                type: 'PUT',
                url: '/api/account/UserInfo',
                data: data,
                beforeSend: function (xhr) {
                    var token = window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    alert("Successfully saving info!");
                },
                error: function (response) {
                    alert('Error');
                }
            });
        }
    });
});