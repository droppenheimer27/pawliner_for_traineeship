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
    './regions/executor/AddNaturalExecutorDocumentBlock',
    './regions/executor/AddJuridicalExecutorDocumentBlock',
    './regions/executor/AddSoleTraderExecutorDocumentBlock',
    './regions/executor/WaitingSubmitExecutorStatusBlock',
    'modules/main/collections/Executors',
    'modules/main/models/Comment',
    'modules/main/models/Photo',
    './AnimatedRegion'
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
    AddNaturalExecutorDocumentBlock, 
    AddJuridicalExecutorDocumentBlock,
    AddSoleTraderExecutorDocumentBlock,
    WaitingSubmitExecutorStatusBlock,
    Executors, 
    Comment, 
    Photo,
    AnimatedRegion) {
    'use strict';
    
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            this.listenTo(B.Radio.channel('main'), 'refresh', this.render);
            this.listenTo(B.Radio.channel('main'), 'saveComment', this.saveComment);
            this.listenTo(B.Radio.channel('main'), 'destroyComment', this.destroyComment);
            
            this.model.fetch();
            this.model.on("sync", this.onSync, this);
        },
        ui: {
            edit: '#edit-executor',
            addPhotos: '#addExecutorPhotos',
            createComment: '#createComment',
            serviceBlock: '.executor-service-region',
            editExecutorBlock: '.edit-executor-block-region',
            commentsBlock: '.comments-block-region',
            photosRegion: '#gallery-executor',
            addPhotosBlock: '.add-photos-region',
            addDocumentBlock: '.add-document-region'
        },
        events: {
            'click @ui.edit': 'onClickEditExecutorButton',
            'click @ui.createComment': 'onClickLeaveCommentButton',
            'click @ui.addPhotos': 'onClickAddPhotosButton'
        },
        regions: {
            serviceBlock: '@ui.serviceBlock',
            editExecutorBlock: '@ui.editExecutorBlock',
            commentsBlock: {
                el: '@ui.commentsBlock',
                regionClass: AnimatedRegion
            },
            photosRegion: {
                el: '@ui.photosRegion',
                replaceElement: true
            },
            addPhotosBlock: '@ui.addPhotosBlock',
            addDocumentBlock: '@ui.addDocumentBlock'
        },
        onSync: function () {
            this.render();
        },
        saveComment: function (model) {
            var newComments = this.model.get('Comments');
            newComments.push(model);;

            this.model.set({'Comments': newComments});
            this.model.fetch();
        },
        destroyComment: function (id) {
            var newComments = _.reject(this.model.get('Comments'), function (el) {
                return id == el.Id;
            });
            this.model.set({'Comments': newComments});
        },
        onClickEditExecutorButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Edit the executor',
                bodyText: new EditExecutorBlock({model: this.model})
            });
        },
        onClickLeaveCommentButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Leave the comment',
                bodyText: new CreateCommentBlock({model: this.model})
            });
            this.onRenderCommentsBlock();
        },
        onClickAddPhotosButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Add photos',
                bodyText:  new AddExecutorPhotosBlock({model: this.model})
            });
        },
        onRenderCommentsBlock: function () {
            var CommentCollection = B.Collection.extend({
                model: Comment
            });

            if (this.model.get('Comments') !== null) {
                this.showChildView('commentsBlock', new CommentCollectionView({
                    collection: new CommentCollection(this.model.get('Comments'))
                }));
            }
        },
        onRender: function () {
            var PhotoCollection = B.Collection.extend({
                model: Photo
            });

            this.showChildView('photosRegion', new ExecutorPhotosCollectionView({
                collection: new PhotoCollection(this.model.get('Photos'))
            }));
            
            this.showChildView('serviceBlock', new ExecutorServicesCollectionView({
                collection: new B.Collection(this.model.get('ServiceClassifers'))
            }));

            this.onRenderCommentsBlock();    
            
            if (window.app.model.get('userId') === this.model.get('UserId')) {
                if (this.model.get('Status') === 2 && this.model.get('NaturalExecutor') !== null) {
                    this.showChildView('addDocumentBlock', new AddNaturalExecutorDocumentBlock({model: this.model}));
                } else if (this.model.get('Status') === 2 && this.model.get('JuridicalExecutor') !== null) {
                    this.showChildView('addDocumentBlock', new AddJuridicalExecutorDocumentBlock({model: this.model}));
                } else if (this.model.get('Status') === 2 && this.model.get('SoleTraderExecutor') !== null) {
                    this.showChildView('addDocumentBlock', new AddSoleTraderExecutorDocumentBlock({model: this.model}));
                }

                if (this.model.get('Status') === 3) {
                    this.showChildView('addDocumentBlock', new WaitingSubmitExecutorStatusBlock());
                }
            }

            $('#gallery-executor' ).jGallery({
                backgroundColor: 'black', 
                textColor: 'black'
            });
        }
    });
});