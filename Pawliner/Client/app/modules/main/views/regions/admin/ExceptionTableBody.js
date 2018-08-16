define([
    'backbone',
    'underscore',
    'marionette',
    './ExceptionRow',
    './ExceptionBlock'
], function (B, _, marionette, ExceptionRow, ExceptionBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'tbody',
        childView: ExceptionRow,
        initialize: function () {
            this.collection.fetch();
        },
        onChildviewClickChild (childView) {
            console.log(childView.model.id);
            // B.Radio.channel('main').trigger('messageui', {
            //     typeHeader: 'success',
            //     headerText: 'Exception #' + childView.model.id,
            //     bodyText: new ExceptionBlock({model: childView.model})
            // });
        }
    });
});
