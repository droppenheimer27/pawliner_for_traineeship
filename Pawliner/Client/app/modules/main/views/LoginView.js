define([
    'jquery',
    'syphon',
	'marionette',
    'i18n!../nls/lng',
    'text!../templates/LoginView.html',
    'jqueryvalidate'
], function ($, syphon, Mn, lng, tpl) {
	'use strict';
    
	return Mn.View.extend({
        template: function(tplPrms) {
            tplPrms.t = lng;
            return _.template(tpl)(tplPrms);
        },
        ui: {
            form: 'form[role="form"]',
            icheckbox: 'input[type="checkbox"]'
        },
        events: {
            "submit @ui.form" : "onSubmitForm"
        },
        initialize: function(){
            window.app.model.on('change:user', this.render, this);
        },
        onSubmitForm: function(e){
            e.preventDefault();
            var data = syphon.serialize($(e.currentTarget));
            window.app.login(_.extend(data, {buyers_password: passMd5}));
        },
        onRender: function(){
//            console.log('onRender login');
//        },
//        onShow: function(){
//            console.log('onShow');
            var param = ((_.has(window.app.model.get("user"), "buyers_email")) ? window.app.model.get("user").buyers_email : '');
            syphon.deserialize(this, {buyers_email: param});
            $(this.ui.form).validate({
                lang: 'ru',
                rules: {
                    buyers_email: {
//                        email: true,
                        required: true
                    },
                    buyers_password: {
                        required: true
                    }
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
                    if(element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                }
            });
        }
	});
});