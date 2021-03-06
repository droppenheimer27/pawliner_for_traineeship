define([
    'backbone',
    'underscore',
    'marionette',
    'text!../../../templates/regions/executor/WaitingSubmitExecutorStatusBlock.html'
], function (B, _, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
    });
});
