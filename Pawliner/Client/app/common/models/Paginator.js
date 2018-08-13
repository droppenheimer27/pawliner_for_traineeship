define([
	'backbone'
], function (B) {
	'use strict';

	return B.Model.extend({
		defaults: {
			totalPages: 0,
            totalRecords: 0,
            pageSize: 1,
            lastPage: 0,
            currentPage: 1,
            currentRecordsBegin: 0,
            currentRecordsEnd: 0,
            listpages: []
        }
	});
});