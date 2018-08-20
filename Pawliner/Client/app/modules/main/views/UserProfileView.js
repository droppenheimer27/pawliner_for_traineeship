define([
    'backbone',
    'syphon',
    'jquery',
    'marionette',
    'text!../templates/UserProfileView.html'
], function (B, syphon, $, marionette, template) {
    'use strict';
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            this.listenTo(B.Radio.channel('main'), 'refresh', this.render);
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

                    if (!response.ExecutorId) {
                        $('#executorProfile').remove();                        
                    } else {
                        $('#executorProfile').attr('href', '#!/main/executor/' + response.ExecutorId);
                    }
                
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
            profileForm: '#user-profile-form',
        },
        events: {
            'submit @ui.profileForm': 'onSubmitProfileForm'
        },
        validateForm: function () {
            this.ui.profileForm.validate({
               ignore: ':hidden',
               rules: {
                    UserName: {
                       required: false,
                       minlength: 6,
                       maxlength: 256
                   },
                   Email: {
                        required: false,
                        email: true
                    },
                    FullName: {
                        required: false,
                        minlength: 2,
                        maxlength: 128
                    },
                    PhoneNumber: {
                        required: false,
                        minlength: 2,
                        maxlength: 128
                    },
                    Skype: {
                        required: false,
                        minlength: 2,
                        maxlength: 128
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
            if (file.files[0] != null) {
                formData.append('Avatar', file.files[0]);
            }

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
                success: function () {
                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'success',
                        headerText: 'Success',
                        bodyText: 'Successfuly updating profile!'
                    });

                    B.Radio.channel('main').trigger('refresh');
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

            if (_.isEmpty(window.app.model.get('tokenInfo'))) {
                window.router.navigate('', { trigger: true });
            }
        }
    });
});