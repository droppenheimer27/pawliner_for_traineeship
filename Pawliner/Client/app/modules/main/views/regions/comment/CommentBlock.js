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
        ui: {
            edit: '.edit-comment',
            // editBlock: '.edit-comment-block-region',
        },
        events: {
            'click @ui.edit': 'onClickEditButton'
        },
        // regions: {
        //     editBlock: '@ui.editBlock',
        // },
        onClickEditButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Edit the comment',
                bodyText: new EditCommentBlock({model: this.model})
            });
        },
        onRender: function () {
            // if (this.model.get('UserId') === window.app.model.get('userId')) {
            //     this.showChildView('editBlock', new EditCommentBlock({model: this.model}));
            // }
        }
    });
});
