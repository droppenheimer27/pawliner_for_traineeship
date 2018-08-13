define([
	'backbone',
    'bpaginator'
], function (B) {
	'use strict';

	return B.PageableCollection.extend({
        pagelinkssize: 10,
        queryParams: {
            pageSize: null,
            totalPages: null,
            totalRecords: null,
        },
        initialize: function(){
            this.pagelinkssize = window.app.modules.config.reports.pagelinkssize || window.app.modules.config.main.pagelinkssize || this.pagelinkssize;
        },
        parseRecords: function (resp, options) {
            return resp.items;
        },
        parseState: function (resp, queryParams, state, options) {
            console.log(resp, "resp");
            return {
                totalPages: resp._meta.pageCount,
                totalRecords: resp._meta.totalCount,
                currentRecordsBegin: ((resp._meta.currentPage-1)*resp._meta.perPage)+1,
                currentRecordsEnd: ((resp._meta.currentPage == resp._meta.pageCount) ? resp._meta.totalCount : ((resp._meta.currentPage-1)*resp._meta.perPage)+resp._meta.perPage),
                pageSize: resp._meta.perPage,
                lastPage: resp._meta.pageCount,
                currentPage: resp._meta.currentPage,
                listpages: this.getListPages(resp)
            };
        },
        getListPages: function (resp) {
            var pagelinkssize = ((this.pagelinkssize < resp._meta.pageCount) ? this.pagelinkssize : resp._meta.pageCount);
            var half = Math.floor(pagelinkssize / 2);
            var start = (((resp._meta.currentPage-half) >= 1) ? resp._meta.currentPage-half : 1);
            var end = ((start+pagelinkssize < resp._meta.pageCount+1) ? start+pagelinkssize : resp._meta.pageCount+1);
            if(end == resp._meta.pageCount+1) {
                start = (((end-pagelinkssize) >= 1) ? end-pagelinkssize : 1);
            } 
//            console.log(this.pagelinkssize, "this.pagelinkssize");
//            console.log(resp._meta.pageCount, "resp._meta.pageCount");
//            
//            console.log(pagelinkssize, "pagelinkssize");
//            console.log(half, "half");
//            console.log(start, "start");
//            console.log(end, "end");
//            var start = 1;
//            var end = 1+this.pagelinkssize+1;
            return _.range(start, end);
        }
	});
});