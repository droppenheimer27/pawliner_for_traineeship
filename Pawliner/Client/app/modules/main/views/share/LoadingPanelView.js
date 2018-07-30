define([
    'underscore',
    'backbone',
	'marionette',
    'i18n!../../nls/lng',
    'text!../../templates/share/LoadingPanelView.html'
], function (_, B, Mn, lng, tpl) {
	'use strict';
	return Mn.View.extend({
        defaultModel: {
            title: "Progress",
            value: 0,
            total: 0,
            percent: 0
        },
        template: function(tplPrms) {
            tplPrms.t = lng;
            return _.template(tpl)(tplPrms);
        },
        initialize: function(){
            var channel = this.options.channel || '';
            var prefixmessage = this.options.prefixmessage || '';
            this.model = new B.Model(this.defaultModel);
            if (_.has(this.options, "title")){
                this.model.set({title: this.options.title});
            }
            this.listenTo(B.Radio.channel(channel), 'collection'+ prefixmessage +'CountChange', this.collectionCountChange);
            this.listenTo(B.Radio.channel(channel), 'model'+ prefixmessage +'FetchSuccess', this.modelValueChange);
            this.listenTo(B.Radio.channel(channel), 'model'+ prefixmessage +'FetchError', this.modelValueChange);
            this.model.on('change', this.render);
        },
        collectionCountChange: function(cnt) {
            var total = ((!_.isUndefined(cnt) && _.isNumber(cnt)) ? cnt : this.model.get("total"));
            var args = {total: total, value: 0, percent: 0};
            this.model.set(args);
        },
        modelValueChange: function(_i) {
            var i = _i || 1;
            var value = this.model.get("value") + i;
            var args = {total: this.model.get("total"), value: value};
            var percent = this.calculatePercent(args);
            _.extend(args, {percent: percent});
            this.model.set(args);
        },
        calculatePercent: function(args) {
            return ((args.total == 0) ? 0 : Math.ceil(100*args.value/args.total));
        },
	});
});