define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/order/SubmitedRespondText.html'
], function (_, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
    });
});
