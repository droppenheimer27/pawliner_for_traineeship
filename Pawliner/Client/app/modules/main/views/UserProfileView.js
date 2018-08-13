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
                    var token = window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    syphon.deserialize(self.ui.profileForm, response);
                    if (!response.AvatarPath) {
                        $('#userProfileAvatar').attr('src', 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
                    } else {
                        $('#userProfileAvatar').attr('src', response.AvatarPath);
                    }
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
            // console.log(data);

            var file = $('#profileAvatar')[0];
            data.Avatar = file.files[0];
            var formData = new FormData();
            formData.append('UserName', data.UserName);
            formData.append('Email', data.Email);
            formData.append('FullName', data.FullName);
            formData.append('PhoneNumber', data.PhoneNumber);
            formData.append('Skype', data.Skype);
            formData.append('Avatar', file.files[0]);
            // formData.append('file', file.files[0]);

            $.ajax({
                type: 'POST',
                url: '/api/account/UserInfo',
                data: formData,
                contentType: false,
                processData: false,
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