define([
    'backbone',
    'syphon',
    'underscore',
    'marionette',
    'text!../../../templates/regions/comment/CreateCommentBlock.html',
    'modules/main/models/Comment'
], function (B, syphon, _, marionette, template, Comment) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            form: 'form[role="form"]'
        },
        events: {
            'submit @ui.form': 'onSubmitForm'
        },
        validateForm: function () {
            this.ui.form.validate({
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
        onSubmitForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.form);
            _.extend(data, {UserId:  window.app.model.get('userId')});
            _.extend(data, {ExecutorId:  this.model.get('Id')});

            this.model = new Comment();
            this.model.set(data);
            this.model.save(data, {
                type: 'POST',
                error: function (model, response, error) {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('saveComment', model);
                    B.Radio.channel('main').trigger('refresh');
                }
            });
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
