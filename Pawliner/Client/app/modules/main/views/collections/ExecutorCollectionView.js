define([
    'backbone',
    'underscore',
    'marionette',
    '../../collections/Executors',
    '../regions/executor/ExecutorBlock'
], function (B, _, marionette, Executors, ExecutorBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        childView: ExecutorBlock,
        collection: new Executors(),
        initialize: function () {
            this.listenTo(B.Radio.channel('main'),'getExecutorsByCheckbox', this.getExecutorsByCheckbox);
            this.collection.fetch();
        },

        getExecutorsByCheckbox: function (services) {
            this.collection.fetch({
                data: {
                    filter: services
                },
            });

            this.render();
        },
    });
});
