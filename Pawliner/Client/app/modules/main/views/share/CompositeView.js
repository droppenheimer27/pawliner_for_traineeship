define([
	'marionette',
], function (Mn) {
	'use strict';
    
	return Mn.View.extend({
        tagName: 'table',
        className: 'table table-hover',
        template: '#table',

        regions: {
          body: {
            el: 'tbody',
            replaceElement: true
          }
        },

        onRender: function() {
          this.showChildView('body', new this.options.RegionView());
        }
    });
});