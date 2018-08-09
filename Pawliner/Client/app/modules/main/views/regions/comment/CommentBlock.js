define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/comment/CommentBlock.html',
    './EditCommentBlock',
], function (_, marionette, template, EditCommentBlock) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            editBlock: '.edit-comment-block-region',
        },
        regions: {
            editBlock: '@ui.editBlock',
        },
        onRender: function () {
            if (this.model.get('UserId') === window.app.model.get('userId')) {
                this.showChildView('editBlock', new EditCommentBlock({model: this.model}));
            }
        }
    });
});
