define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/service/ServiceListBlock.html',
    '../../../collections/Services',
], function (_, marionette, template) {
    'use strict';

    return marionette.View.extend({
        tagName: 'li',
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
    });
});
