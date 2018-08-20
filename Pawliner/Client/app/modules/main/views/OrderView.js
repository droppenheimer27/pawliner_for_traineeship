define([
    'backbone',
    'jquery',
    'marionette',
    'text!../templates/OrderView.html',
    './collections/OrderRespondsCollectionView',
    './collections/OrderPhotosCollectionView',
    './regions/order/CreateRespondBlock',
    './regions/photos/AddOrderPhotosBlock',
    './regions/order/EditOrderBlock',
    'modules/main/collections/Orders',
    'modules/main/models/Photo',
    'modules/main/models/Respond',
    './AnimatedRegion'
], function (B, 
    $, 
    marionette, 
    template, 
    OrderRespondsCollectionView, 
    OrderPhotosCollectionView, 
    CreateRespondBlock, 
    AddOrderPhotosBlock, 
    EditOrderBlock, 
    Orders, 
    Photo, 
    Respond,
    AnimatedRegion) {
    'use strict';
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            this.listenTo(B.Radio.channel('main'), 'refresh', this.render);
            this.listenTo(B.Radio.channel('main'), 'saveRespond', this.saveRespond);
            this.listenTo(B.Radio.channel('main'), 'destroyRespond', this.destroyRespond);

            this.model.on("sync", this.onSync, this);
            this.model.fetch();
        },
        ui: {
            createRespond: '#createRespond',
            editOrder: '#editOrder',
            addPhotos: '#addPhotos',
            respondBlock: '.respond-block-region',
            createRespondBlock: '.create-respond-block-region',
            // editOrderBlock: '.edit-order-block-region',
            photosRegion: '#gallery',
            addPhotosBlock: '.add-photos-region'
        },
        events: {
            'click @ui.createRespond': 'onClickLeaveRespondButton',
            'click @ui.editOrder': 'onClickEditOrderButton',
            'click @ui.addPhotos': 'onClickAddPhotosButton'
        },
        regions: {
            respondBlock: {
                el: '@ui.respondBlock',
                regionClass: AnimatedRegion
            },
            createRespondBlock: '@ui.createRespondBlock',
            editOrderBlock: '@ui.editOrderBlock',
            photosRegion: {
                el: '@ui.photosRegion',
                replaceElement: true
            },
            addPhotosBlock: '@ui.addPhotosBlock'
        },
        onSync: function () {
            this.render();
        },
        saveRespond: function (model) {
            console.log(model, 'saveRespond')
            var newResponds = this.model.get('Responds');
            newResponds.push(model);;

            this.model.set({'Responds': newResponds});
            this.model.fetch();
        },
        destroyRespond: function (id) {
            var newResponds = _.reject(this.model.get('Responds'), function (el) {
                return id == el.Id;
            });
            this.model.set({'Responds': newResponds});
        },
        onClickLeaveRespondButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Leave the respond',
                bodyText: new CreateRespondBlock({model: this.model})
            });
            this.onRenderRespondsBlock();
        },
        onClickEditOrderButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Edit the order',
                bodyText: new EditOrderBlock({model: this.model})
            });
        },
        onClickAddPhotosButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Add photos',
                bodyText:  new AddOrderPhotosBlock({model: this.model})
            });
        },
        onRenderRespondsBlock: function () {
            var RespondCollection = B.Collection.extend({
                model: Respond
            });

            if (this.model.get('Responds') !== null) {  
                this.showChildView('respondBlock', new OrderRespondsCollectionView({
                    collection: new RespondCollection(this.model.get('Responds'))
                }));
            }
        },
        onRenderPhotosBlock: function () {
            var PhotoCollection = B.Collection.extend({
                model: Photo
            });
            if (this.model.get('Photos') !== null) {  
                this.showChildView('photosRegion', new OrderPhotosCollectionView({
                    collection: new PhotoCollection(this.model.get('Photos'))
                }));
            }
        },
        onRender: function () {
            // var PhotoCollection = B.Collection.extend({
            //     model: Photo
            // });
            // this.showChildView('photosRegion', new OrderPhotosCollectionView({
            //     collection: new PhotoCollection(this.model.get('Photos'))
            // }));

            // this.showChildView('respondBlock', new OrderRespondsCollectionView({
            //     collection: new RespondCollection(this.model.get('Responds'))
            // }));
            
            this.onRenderRespondsBlock();
            this.onRenderPhotosBlock();

            // if (window.app.model.get('roles') === 'Executor') {
            //     this.showChildView('createRespondBlock', new CreateRespondBlock({model: this.model}));
            // }

            // if (window.app.model.get('userId') === this.model.get('UserId')) {
            //     this.showChildView('addPhotosBlock', new AddOrderPhotosBlock({model: this.model}));
            // }

            $('#gallery' ).jGallery({
                backgroundColor: 'black', 
                textColor: 'black'
            });
        }
    });
});