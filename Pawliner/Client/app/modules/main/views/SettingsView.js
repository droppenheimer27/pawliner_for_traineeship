define([
    'jquery',
    'syphon',
	'marionette',
    'i18n!../nls/lng',
    'modules/main/models/Settings',
    'text!../templates/SettingsView.html',
    'jqueryvalidate'
], function ($, syphon, Mn, lng, Model, tpl) {
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
            "submit @ui.form" : "onSubminForm"
        },
        initialize: function(){
            console.log(this.options, '---------------');
            this.model = new Model();
        },
        onSubminForm: function(e){
            e.preventDefault();
            var data = syphon.serialize($(e.currentTarget));
            console.log(data, '-----result Settings form1');
            console.log(this.model, '---------------');
            this.model.fetch();
//            window.app.SettingsSession.setKey("pathToSignSoft", data.pathToSignSoft);
//            window.app.SettingsSession.setKey("intervalChanges", data.intervalChanges);
//            window.app.vent.trigger('messageui', {
//                typeHeader: 'success',
//                headerText: 'Сообщение!',
//                bodyText: 'Настройки сохранены успешно!'
//            });
        },
        onRender: function(){
            this._setValidate();
            this._setForm();
            $(this.ui.icheckbox).iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%' // optional
            });
        },
        _setValidate: function(){
            $(this.ui.form).validate({
                lang: 'ru',
                rules: {
//                    pathToSignSoft: {
//                        required: true
//                    }
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
        },
        _setForm: function(){
            syphon.deserialize(this, {
//                "pathToSignSoft": window.app.SettingsSession.getKey("pathToSignSoft"),
//                "intervalChanges": window.app.SettingsSession.getKey("intervalChanges")
            });
        }
	});
});