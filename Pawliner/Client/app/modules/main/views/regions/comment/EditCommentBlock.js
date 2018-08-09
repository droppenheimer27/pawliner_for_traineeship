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

            var self = this;
            var data = syphon.serialize(this.ui.editCommentForm);
            data.Id = this.model.get('Id');

            console.log(data);
            var comment = new Comment();
            comment.set(data);
            comment.save(data, {
                success: function () {
                    $('#model-comment-put' + self.model.get('Id')).modal('hide');
                }
            });
        },
        onClickRemoveCommentButton: function (e) {
            e.preventDefault();

            var self = this;

            $.ajax({
                type: 'DELETE',
                url: '/api/comments/' + this.model.get('Id'),
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    $('#model-comment-put' + self.model.get('Id')).modal('hide');
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
    });
});
