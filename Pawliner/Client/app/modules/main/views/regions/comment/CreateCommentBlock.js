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
        onSubmitForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.form);
            data.UserId = window.app.model.get('userId');
            data.ExecutorId = this.model.get('Id');

            this.model = new Comment();
            this.model.set(data);
            this.model.save(data, {type: 'POST'}, {
                success: function () {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('refresh');
                }
            });
        }
    });
});
