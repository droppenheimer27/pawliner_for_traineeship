define([
    'backbone',
    'underscore',
    'jquery',
	'marionette',
    'text!../templates/AdminPanelView.html',
    './regions/admin/LoginBlock',
    './regions/AdminHome',
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
], function (B, _, $, Mn, tpl, LoginBlock, AdminHome) {
	'use strict';

	return Mn.View.extend({
        initialize: function() {
            this.listenTo(B.Radio.channel('main'), 'hasLogin', this.hasLogin);
        },
		template: function(tplPrms) {
            return _.template(tpl)(tplPrms);
        },
        ui: {
            adminRegion: '#admin-region'
        },
        regions: {
            content: '.content',
            adminRegion: {
                el: '#admin-region',
                replaceElement: true
            },
        },
        hasLogin: function () {
            this.render();
        },
        onRender: function () {
            if (window.app.model.get('roles') === 'Administrator' && !_.isEmpty(window.app.model.get('userId'))) {
                this.showChildView('adminRegion', new AdminHome());
            } else {
                this.showChildView('adminRegion', new LoginBlock());
            }
        }
	});
});
