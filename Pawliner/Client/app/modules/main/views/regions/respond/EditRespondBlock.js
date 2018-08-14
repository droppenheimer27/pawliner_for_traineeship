define([
    'backbone',
    'syphon',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/respond/EditRespondBlock.html',
    'jqueryvalidate'
], function (B, syphon, $, _, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model.on('change', this.changeModel, this);
        },
        ui: {
            editRespondForm: 'form[role="form"]',
            removeRespondButton: '#removeRespond'
        },
        events: {
            'submit @ui.editRespondForm': 'onSubmitEditRespondForm',
            'click @ui.removeRespondButton': 'onClickRemoveRespondButton'
        },
        changeModel: function () {
            $('#model-respond-put' + this.model.get('Id')).modal('hide');
        },
        validateForm: function () {
            this.ui.editRespondForm.validate({
               ignore: ':hidden',
               rules: {
                   Content: {
                       required: true
                   },
               },
               highlight: function(element) {
                   $(element).closest('.input-group').addClass('has-error');
               },
               unhighlight: function(element) {
                   $(element).closest('.input-group').removeClass('has-error');
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
        onSubmitEditRespondForm: function (e) {
            e.preventDefault();
            var data = syphon.serialize(this.ui.editRespondForm);

            this.model.set(data);
            this.model.save(data);  
        },
        onClickRemoveRespondButton: function (e) {
            e.preventDefault();

            this.model.destroy();
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
