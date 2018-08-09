define([
    'backbone',
    'jquery',
    'marionette',
    'text!../templates/ExecutorView.html',
    './collections/ExecutorServicesCollectionView',
    './collections/CommentCollectionView',
    './regions/comment/CreateCommentBlock',
    'modules/main/collections/Comments'
], function (B, $, marionette, template, ExecutorServicesCollectionView, CommentCollectionView, CreateCommentBlock, Comments) {
    'use strict';
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            this.model.fetch();
            this.model.on("sync", this.onSync, this);
        },
        ui: {
            serviceBlock: '.executor-service-region',
            commentsBlock: '.comments-block-region',
            createCommentBlock: '.create-comment-block-region'
        },
        regions: {
            serviceBlock: '@ui.serviceBlock',
            commentsBlock: '@ui.commentsBlock',
            createCommentBlock: '@ui.createCommentBlock'
        },
        onSync: function () {
            this.render();
        },
        onRender: function () {
            this.showChildView('serviceBlock', new ExecutorServicesCollectionView({
                collection: new B.Collection(this.model.get('ServiceClassifers'))
            }));
            
            if (this.model.get('Comments') !== null) {
                this.showChildView('commentsBlock', new CommentCollectionView({
                    collection: new Comments(this.model.get('Comments'))
                }));
            }

            if (!_.isEmpty(window.app.model.get('userId'))) {
                this.showChildView('createCommentBlock', new CreateCommentBlock({model: this.model}));
            }
        }
    });
});