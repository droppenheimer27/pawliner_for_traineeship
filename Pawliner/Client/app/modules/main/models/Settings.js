define([
	'backbone',
], function (B) {
	'use strict';

	return B.Model.extend({
        defaults: {
            inboxnew: 0,
        },
	});
});
