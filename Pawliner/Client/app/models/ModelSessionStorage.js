define([
	'backbone',
//    'backbone.localStorage'
], function (B) {
	'use strict';

	return B.Model.extend({
        
        initialize: function() {
            this.fetch();
//            this.on('change', this.save, this);
        },

        fetch: function () {
            this.set(JSON.parse(sessionStorage.getItem('app')));
        },

        save: function (attributes) {
            sessionStorage.setItem('app', JSON.stringify(this.toJSON()));
        },

        destroy: function (options) {
            sessionStorage.removeItem('app');
        },

        isEmpty: function () {
            return (_.size(this.attributes) <= 1); // just 'id'
        }
    });
});