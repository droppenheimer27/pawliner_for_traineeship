define([
    'backbone',
    'underscore',
    'marionette',
    'text!../../../templates/regions/comment/CommentBlock.html',
    './EditCommentBlock',
], function (B, _, marionette, template, EditCommentBlock) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model.on('sync', this.onSync, this);
        },
        ui: {
            edit: '.edit-comment'
        },
        events: {
            'click @ui.edit': 'onClickEditButton'
        },
        onSync: function () {
            this.render();
        },
        onClickEditButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Edit the comment',
                bodyText: new EditCommentBlock({model: this.model})
            });
        },
    });
});
