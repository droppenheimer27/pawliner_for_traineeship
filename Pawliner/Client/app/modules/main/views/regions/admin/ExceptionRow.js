define([
    'backbone',
    'underscore',
    'marionette',
    'text!../../../templates/regions/admin/ExceptionRow.html',
    './ExceptionBlock'
], function (B, _, marionette, template, ExceptionBlock) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        tagName: 'tr',
        events: {
            'click': 'onClickRow'
        },
        onClickRow: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Exception #' + this.model.id,
                bodyText: new ExceptionBlock({model: this.model})
            });
        },
    });
});
