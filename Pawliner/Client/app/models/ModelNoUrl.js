define([
	'backbone'
], function (B) {
	'use strict';

	return B.Model.extend({
        sync: function() { return null; },
        fetch: function() { return null; },
        save: function() { return null; }
    });
});