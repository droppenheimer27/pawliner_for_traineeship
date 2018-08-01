define([
    'underscore',
    'jquery',
	'marionette',
    'text!../templates/IndexView.html',
    'modules/main/models/Login',
    'modules/main/models/Register',
    'modules/main/models/Order',
    './regions/user/UserBlock',
    './regions/Home',
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
], function (_, $, Mn, tpl, Login, Register, Order, UserBlock, Home) {
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
            registerLink: 'a[id="registerLink"]',
            loginLink: 'a[id="loginLink"]'
        },
        regions: {
            content: '.content',
            userFormRegion: {
                el: '#user-form-region',
                replaceElement: true
            },
            homeRegion: {
                el: '#home-region',
                replaceElement: true
            },
        },
        events: {
            "click @ui.registerLink": "openRegisterBlock",
            "click @ui.loginLink": "openLoginBlock"
        },
        openRegisterBlock: function (e) {
            e.preventDefault();

            $("#loginBlock").hide();
            $("#registerBlock").show();
        },
        openLoginBlock: function (e) {
            e.preventDefault();

            $("#registerBlock").hide();
            $("#loginBlock").show();
        },
        onRender: function() {
            this.showChildView('userFormRegion', new UserBlock());
            this.showChildView('homeRegion', new Home());
        }
	});
});
