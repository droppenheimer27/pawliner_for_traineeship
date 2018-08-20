define([
    'backbone',
    'syphon',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/comment/EditCommentBlock.html'
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
            editCommentForm: 'form[role="form"]',
            removeCommentButton: '#removeComment'
        },
        events: {
            'submit @ui.editCommentForm': 'onSubmitEditCommentForm',
            'click @ui.removeCommentButton': 'onClickRemoveCommentButton'
        },
        validateForm: function () {
            this.ui.editCommentForm.validate({
               ignore: ':hidden',
               rules: {
                    Content: {
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
                   if (element.parent('.form-group').length) {
                       error.insertAfter(element.parent());
                   } else {
                       error.insertAfter(element);
                   }
               }
           });
        },
        changeModel: function () {
            B.Radio.channel('main').trigger('messageuihide'); 
        },
        onSubmitEditCommentForm: function (e) {
            e.preventDefault();

            var data = syphon.serialize(this.ui.editCommentForm);
            _.extend(data, {Id: this.model.get('Id')})

            this.model.set(data);
            this.model.save(data);
        },
        onClickRemoveCommentButton: function (e) {
            e.preventDefault();
            var self = this;
            
            this.model.destroy({
                success: function () {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('destroyComment', self.model.get('Id'));
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
