define([
    'backbone',
    'jquery',
    'marionette',
    'text!../templates/OrderView.html',
    './collections/OrderRespondsCollectionView',
    './regions/order/CreateRespondBlock',
    'modules/main/collections/Orders',
    './regions/order/EditOrderBlock'
], function (B, $, marionette, template, OrderRespondsCollectionView, CreateRespondBlock, Orders, EditOrderBlock) {
    'use strict';
    return marionette.View.extend({
        template: function (args) {
            return _.template(template)(args);
        },
        initialize: function() {
            this.model.fetch();
            this.options.Id = this.model.get('Id');
            this.model.on("sync", this.onSync, this);
        },
        ui: {
            respondBlock: '#respond-block-region',
            createRespondBlock: '#create-respond-block-region',
            editOrderBlock: '#edit-order-block-region'
        },
        regions: {
            respondBlock: '@ui.respondBlock',
            createRespondBlock: '@ui.createRespondBlock',
            editOrderBlock: '@ui.editOrderBlock'
        },
        onSync: function() {
            this.render();
        },
        onRender: function () {
            this.showChildView('respondBlock', new OrderRespondsCollectionView({
                collection: new Orders(this.model.get('Responds'))
            }));

            if (window.app.model.get('roles') === 'Executor') {
                this.showChildView('createRespondBlock', new CreateRespondBlock({OrderId: this.options.Id}));
            }

            if (window.app.model.get('userId') === this.model.get('UserId')) {
                this.showChildView('editOrderBlock', new EditOrderBlock({model: this.model}));
            }
        }
    });
});