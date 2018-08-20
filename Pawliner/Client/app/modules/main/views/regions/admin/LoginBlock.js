define([
    'backbone',
    'underscore',
    'jquery',
    'syphon',
	'marionette',
    'text!../../../templates/regions/admin/LoginBlock.html',
    'jqueryvalidate'
], function (B, _, $, syphon, Mn, tpl) {
	'use strict';

	return Mn.View.extend({
		template: function(tplPrms) {
            return _.template(tpl)(tplPrms);
        },
        ui: {
            form: 'form[role="form"]',
        },
        events: {
            "submit @ui.form": "onSubmitLoginForm",
        },
        validateForm: function () {
            this.ui.form.validate({
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
            
            var data = syphon.serialize(this.ui.form);
            data.grant_type = 'password';

            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: '/Token',
                data: data,
                success: function (response) {
                    var args = {
                        tokenInfo: response.access_token,
                        userId: response.id,
                        roles: response.roles
                    };
                    
                    window.app.model.set(args);
                    window.app.model.save(args);

                    window.app.setupToken(args.tokenInfo);

                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'success',
                        headerText: 'Success',
                        bodyText: 'Successfuly log in!'
                    });

                    B.Radio.channel('main').trigger('hasLogin');
                    B.Radio.channel('main').trigger('refresh');
                },
                error: function (response) {
                    var error = ((_.has(response, 'responseText')) ? response.responseJSON.error_description : 'Unknown error');
                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'danger',
                        headerText: 'Error',
                        bodyText: error
                    });
                }
            });
        },
        onRender: function () {
            this.validateForm();
        }
	});
});
