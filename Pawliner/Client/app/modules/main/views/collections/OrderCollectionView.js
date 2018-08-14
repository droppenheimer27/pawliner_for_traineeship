define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    '../../collections/Orders',
    '../regions/order/OrderBlock'
], function (B, _, $, marionette, Orders, OrderBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        childView: OrderBlock,
        RadioName: '',
        initialize: function () {
            this.collection = new Orders(),
            this.RadioName = this.options.RadioName;

            this.collection.on("sync", this.onSync, this);
            this.listenTo(B.Radio.channel('main'),'getOrdersByCheckbox', this.fetchData);
            // this.listenTo(B.Radio.channel(this.RadioName), 'changeSearch'+ this.RadioName, this.fetchData);
            this.listenTo(B.Radio.channel(this.RadioName), 'changePage' + this.RadioName, this.fetchData);
            // this.listenTo(B.Radio.channel(this.RadioName), 'changeSort'+ this.RadioName, this.fetchData);
            this.collection.trigger("syncstarted");
            this.fetchData();
        },
        onSync: function(collection){
            B.Radio.channel(this.RadioName).trigger("changeResult"+this.RadioName, collection.state);
        },
        fetchData: function (paramadd){
            var search = B.Radio.channel(this.RadioName).request("requestSearch"+ this.RadioName);
            var page = B.Radio.channel(this.RadioName).request("requestPage"+ this.RadioName);
            var sort = B.Radio.channel(this.RadioName).request("requestSort"+ this.RadioName);
            var per_page = B.Radio.channel(this.RadioName).request("requestCount"+ this.RadioName);

            var param = {page: page, "perPage": 2, sort: sort};
            if (!_.isEmpty(search)){
                _.extend(param, {'query': search});
            }
            if (!_.isEmpty(paramadd)){
                _.extend(param, {filter: paramadd});
            }
            
            this.collection.fetch({data: param});
        },
        getOrdersByCheckbox: function (services) {
            this.collection.fetch({
                data: {
                    filter: services
                },
            });

            this.render();
        },
    });
});
