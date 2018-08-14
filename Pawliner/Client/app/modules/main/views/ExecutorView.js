define([
    'backbone',
    'jquery',
    'marionette',
    'text!../templates/ExecutorView.html',
    './collections/ExecutorServicesCollectionView',
    './collections/CommentCollectionView',
    './collections/ExecutorPhotosCollectionView',
    './regions/comment/CreateCommentBlock',
    './regions/executor/EditExecutorBlock',
    './regions/photos/AddExecutorPhotosBlock',
    'modules/main/collections/Executors',
    'modules/main/models/Comment',
    'modules/main/models/Photo'
], function (B, 
    $, 
    marionette, 
    template, 
    ExecutorServicesCollectionView, 
    CommentCollectionView, 
    ExecutorPhotosCollectionView, 
    CreateCommentBlock, 
    EditExecutorBlock,
    AddExecutorPhotosBlock, 
    Executors, 
    Comment, 
    Photo) {
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
            editExecutorBlock: '.edit-executor-block-region',
            commentsBlock: '.comments-block-region',
            createCommentBlock: '.create-comment-block-region',
            photosRegion: '#gallery-executor',
            addPhotosBlock: '.add-photos-region'
        },
        regions: {
            serviceBlock: '@ui.serviceBlock',
            editExecutorBlock: '@ui.editExecutorBlock',
            commentsBlock: '@ui.commentsBlock',
            createCommentBlock: '@ui.createCommentBlock',
            photosRegion: {
                el: '@ui.photosRegion',
                replaceElement: true
            },
            addPhotosBlock: '@ui.addPhotosBlock'
        },
        onSync: function () {
            this.render();
        },
        onRender: function () {

            var PhotoCollection = B.Collection.extend({
                model: Photo
            });

            this.showChildView('photosRegion', new ExecutorPhotosCollectionView({
                collection: new PhotoCollection(this.model.get('Photos')) //this.model.get('Photos')
            }));

            var CommentCollection = B.Collection.extend({
                model: Comment
            });

            this.showChildView('serviceBlock', new ExecutorServicesCollectionView({
                collection: new B.Collection(this.model.get('ServiceClassifers'))
            }));
            
           
            if (this.model.get('Comments') !== null) {
                this.showChildView('commentsBlock', new CommentCollectionView({
                    collection: new CommentCollection(this.model.get('Comments'))
                }));
            }

            if (!_.isEmpty(window.app.model.get('userId'))) {
                this.showChildView('createCommentBlock', new CreateCommentBlock({model: this.model}));
            }

            if (window.app.model.get('userId') === this.model.get('UserId')) {
                this.showChildView('editExecutorBlock', new EditExecutorBlock({model: this.model}));
                this.showChildView('addPhotosBlock', new AddExecutorPhotosBlock({model: this.model}));
            }

            $('#gallery-executor' ).jGallery({
                backgroundColor: 'black', 
                textColor: 'black'
            });
        }
    });
});