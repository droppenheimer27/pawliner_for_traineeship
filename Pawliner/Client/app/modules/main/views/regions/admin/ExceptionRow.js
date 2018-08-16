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
        // triggers: {
        //     click: 'click:child'
        // },
        ui: {
            exceptionRegion: '.edit-exception-region'
        },
        regions: {
            exceptionRegion: '@ui.exceptionRegion'
        },
        onRender: function () {
            this.showChildView('exceptionRegion', new ExceptionBlock({model: this.model}));
        }
    });
});
