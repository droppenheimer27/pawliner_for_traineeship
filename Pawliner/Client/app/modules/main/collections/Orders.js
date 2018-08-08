define([
    'backbone',
    '../models/Order',
    'bpaginator'
], function (B, Order) {
    'use strict';

    return B.PageableCollection.extend({
        model: Order,
        url : '/api/order',
        state: {
            firstPage: 1,
            currentPage: 1
          },
          queryParams: {
            currentPage: "current_page",
            pageSize: "page_size"
          }
    });
});