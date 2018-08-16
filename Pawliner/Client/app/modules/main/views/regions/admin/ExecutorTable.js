define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/admin/ExecutorTable.html',
    './ExecutorTableBody'
], function (_, marionette, template, ExecutorTableBody) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        tagName: 'table',
        className: 'table table-bordered table-striped dataTable',
        regions: {
            body: {
                el: 'tbody',
                replaceElement: true
            }
        },
        onRender: function() {
            this.showChildView('body', new ExecutorTableBody({
                collection: this.collection
            }));
        }
    });
});