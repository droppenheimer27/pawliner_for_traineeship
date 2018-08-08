define([
    'backbone',
    'underscore',
    'marionette',
    '../../collections/Orders',
    '../regions/order/RespondBlock'
], function (B, _, marionette, Orders, RespondBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        childView: RespondBlock,
        initialize: function () {
            this.listenTo(B.Radio.channel('main'), 'refreshData', this.refreshData);
            this.collection.fetch();
        },
        refreshData: function () {
            console.log('REFRESH');
            this.collection.fetch();

            this.render();
        }
    });
});
