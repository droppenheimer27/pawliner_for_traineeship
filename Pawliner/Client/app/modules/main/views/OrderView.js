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
    'modules/main/models/Respond'
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
    Respond) {
    'use strict';
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            this.listenTo(B.Radio.channel('main'),'refreshOrderView', this.render);

            this.model.on("sync", this.onSync, this);
            this.model.fetch();
        },
        ui: {
            respondBlock: '.respond-block-region',
            createRespondBlock: '.create-respond-block-region',
            editOrderBlock: '.edit-order-block-region',
            photosRegion: '#gallery',
            addPhotosBlock: '.add-photos-region'
        },
        regions: {
            respondBlock: '@ui.respondBlock',
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
        onRender: function () {
            var PhotoCollection = B.Collection.extend({
                model: Photo
            });
            this.showChildView('photosRegion', new OrderPhotosCollectionView({
                collection: new PhotoCollection(this.model.get('Photos')) //this.model.get('Photos')
            }));

            var RespondCollection = B.Collection.extend({
                model: Respond
            });

            this.showChildView('respondBlock', new OrderRespondsCollectionView({
                collection: new RespondCollection(this.model.get('Responds'))
            }));

            if (window.app.model.get('roles') === 'Executor') {
                this.showChildView('createRespondBlock', new CreateRespondBlock({model: this.model}));
            }

            if (window.app.model.get('userId') === this.model.get('UserId')) {
                this.showChildView('editOrderBlock', new EditOrderBlock({model: this.model}));
                this.showChildView('addPhotosBlock', new AddOrderPhotosBlock({model: this.model}));
            }

            $('#gallery' ).jGallery({
                backgroundColor: 'black', 
                textColor: 'black'
            });
        }
    });
});