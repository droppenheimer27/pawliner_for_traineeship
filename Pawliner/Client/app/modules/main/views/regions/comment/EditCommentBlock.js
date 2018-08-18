define([
    'backbone',
    'syphon',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/comment/EditCommentBlock.html',
    'modules/main/models/Comment'
], function (B, syphon, $, _, marionette, template, Comment) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            editCommentForm: 'form[role="form"]',
            removeCommentButton: '#removeComment'
        },
        events: {
            'submit @ui.editCommentForm': 'onSubmitEditCommentForm',
            'click @ui.removeCommentButton': 'onClickRemoveCommentButton'
        },
        onSubmitEditCommentForm: function (e) {
            e.preventDefault();

            var data = syphon.serialize(this.ui.editCommentForm);
            _.extend(data, {Id: this.model.get('Id')})

            this.model = new Comment();
            this.model.set(data);
            this.model.save(data, {
                success: function () {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('refresh');
                }
            });
        },
        onClickRemoveCommentButton: function (e) {
            e.preventDefault();

            $.ajax({
                type: 'DELETE',
                url: '/api/comments/' + this.model.get('Id'),
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('refresh');
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
    });
});
