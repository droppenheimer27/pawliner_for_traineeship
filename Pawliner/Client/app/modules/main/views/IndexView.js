define([
    'underscore',
    'jquery',
	'marionette',
    'text!../templates/IndexView.html',
    './ModalView',
    './regions/user/UserBlock',
    './regions/Home',
    './regions/Search',
    'css!../../../../vendor/js/bootstrap/dist/css/bootstrap',
    'css!../../../../vendor/js/AdminLTE/bower_components/bootstrap/dist/css/bootstrap',
    'css!../../../../vendor/js/AdminLTE/dist/css/AdminLTE.min',
    'css!../../../../vendor/js/AdminLTE/dist/css/skins/_all-skins.min',
    'css!../../../../vendor/css/pawliner',
    'bootstrap',
    'fastclick',
    'slimScroll',
    'AdminLTE',
    'jqueryvalidate'
], function (_, $, Mn, tpl, ModalView, UserBlock, Home, Search) {
	'use strict';

	return Mn.View.extend({
        initialize: function() {
        },
		template: function(tplPrms) {
            return _.template(tpl)(tplPrms);
        },
        ui: {
            userFormRegion: '#user-form-region',
            homeRegion: '#home-region',
            searchRegion: '#search-region' 
        },
        regions: {
            content: '.content',
            modalui: '#modalui',
            userFormRegion: {
                el: '#user-form-region',
                replaceElement: true
            },
            homeRegion: {
                el: '#home-region',
                replaceElement: true
            },
            searchRegion: {
                el: '@ui.searchRegion',
                replaceElement: true
            },
        },
        onRender: function() {
            this.showChildView('userFormRegion', new UserBlock());
            this.showChildView('homeRegion', new Home());
            this.showChildView('searchRegion', new Search());
            this.showChildView('modalui', new ModalView());
        }
	});
});
