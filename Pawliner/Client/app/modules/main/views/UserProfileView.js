define([
    'jquery',
    'marionette',
    'text!../templates/UserProfileView.html',
    'modules/main/models/User',
], function ($, marionette, template, User) {
    'use strict';
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            let userInfo = '';

            $.ajax({
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                url: '/api/account/UserInfo',
                beforeSend: function (xhr) {

                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    console.log(response);
                    $('#profileLogin').val(response.UserName);
                    $('#profileEmail').val(response.Email);
                    $('#profileName').val(response.FullName);
                    $('#profileNumber').val(response.PhoneNumber);
                    $('#profileSkype').val(response.Skype);
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

            $.ajax({
                type: 'PUT',
                url: '/api/account/UserInfo',
                data: {
                    username:  $('#profileLogin').val(),
                    email:  $('#profileEmail').val(),
                    fullName:  $('#profileName').val(),
                    phoneNumber:  $('#profileNumber').val(),
                    skype:  $('#profileSkype').val(),
                },
                beforeSend: function (xhr) {

                    var token = sessionStorage.getItem('tokenInfo');
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