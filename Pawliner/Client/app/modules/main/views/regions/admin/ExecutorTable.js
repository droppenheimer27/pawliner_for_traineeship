define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/admin/ExecutorTable.html',
    './ExecutorTableBody',
    '../../../../../common/views/Paginator',
    '../../../../../common/models/Paginator'
], function (_, marionette, template, ExecutorTableBody, Paginator, PaginatorModel) {
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
            },
        },
        onRender: function() {
            this.showChildView('body', new ExecutorTableBody({
                collection: this.collection
            }));
     
            // var paginatorModel = new PaginatorModel();
            // _.extend(settings, {model: paginatorModel});

            // this.showChildView('paginatorAdminExecutors', new Paginator(settings));
        }
    });
});