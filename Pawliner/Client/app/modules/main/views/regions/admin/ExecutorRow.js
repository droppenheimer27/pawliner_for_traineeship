define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/admin/ExecutorRow.html',
    './SubmitExecutorBlock'
], function (_, marionette, template, SubmitExecutorBlock) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        tagName: 'tr',
        ui: {
            submitExecutor: '.submit-executor-region'
        },
        regions: {
            submitExecutor: '@ui.submitExecutor'
        },
        onRender: function () {
            this.showChildView('submitExecutor', new SubmitExecutorBlock({model: this.model}));
        }
    });
});
