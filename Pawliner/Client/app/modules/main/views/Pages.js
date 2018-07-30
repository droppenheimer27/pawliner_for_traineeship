define([
	'marionette',
    'text!../templates/Pages.html'
], function (Mn, tpl) {
	'use strict';
	return Mn.View.extend({
        template: function(tplPrms) {
            return _.template(tpl)(tplPrms);
        },
        templateContext: function () {
            return {
                content: this.options.content
            };
        }
    });
});