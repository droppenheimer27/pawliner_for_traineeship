define([
    'jquery',
    'backbone',
	'marionette',
    'text!../templates/Paginator.html',
    'css!../../modules/main/css/main'
], function ($, B, Mn, tpl) {
	'use strict';

	return Mn.View.extend({
        RadioName: '',
        template: function(tplPrms) {
            return _.template(tpl)(tplPrms);
        },
        ui: {
            li: "li",
        },
        events: {
            "click @ui.li": "onChangePage",
        },
        initialize: function(){
            this.RadioName = this.options.RadioName || 'main';
            this.listenTo(B.Radio.channel(this.RadioName),'changeResult'+ this.RadioName, this.changeResult);
            B.Radio.channel(this.RadioName).reply("requestPage"+ this.RadioName, this.getPage, this);
        },
        getPage: function(){
            return this.model.get("currentPage");
//            return ((_.has(data, "ButtonPanelSort") && !_.isEmpty(data.ButtonPanelSort)) ? data.ButtonPanelSort : "");
        },
        onChangePage: function(e){
            e.preventDefault();
            if(false === $(e.currentTarget).hasClass("disabled")){
                this.model.set({currentPage: e.target.getAttribute("data-value")});
                B.Radio.channel(this.RadioName).trigger("changePage" + this.RadioName);
            }
        },
        changeResult: function(args){
            this.model.set(args);
            this.render();
        }
	});
});