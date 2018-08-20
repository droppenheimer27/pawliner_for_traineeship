define([
	'marionette',
], function (Mn) {
	'use strict';
    return Mn.Region.extend({
        attachHtml: function (view) {    
            view.$el
                .css({display: 'none'})
                .appendTo(this.$el);      
            if (!this.isSwappingView()) {
                view.$el.fadeIn('slow')
            }
        },
        
        removeView: function (view) {
            view.$el.fadeOut('slow', () => {
                this.destroyView(view);
                if (this.currentView) {
                    this.currentView.$el.fadeIn('slow');
                }
            })    
        }
    });
});  