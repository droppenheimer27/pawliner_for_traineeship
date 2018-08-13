define([
    'backbone',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/photos/PhotosBlock.html'
], function (B, $, _, marionette, template) {
    'use strict';

    return marionette.View.extend({
        tagName: 'a',
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        attributes: function(){
            return {href: this.model.get('Path')};
        }
    });
});
