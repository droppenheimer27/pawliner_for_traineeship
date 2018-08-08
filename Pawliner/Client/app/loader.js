requirejs.config({
    baseUrl: './app',
	paths: {
        underscore: '../vendor/js/underscore/underscore-min',
        //jquery: '../vendor/js/AdminLTE/plugins/jQuery/jquery-2.2.3.min',
        jquery: '../vendor/js/AdminLTE/bower_components/jquery/dist/jquery.min',
        Cookies: '../vendor/js/js-cookie/src/js.cookie',
        fastclick: '../vendor/js/AdminLTE/plugins/fastclick/fastclick.min',
        slimScroll: '../vendor/js/AdminLTE/plugins/slimScroll/jquery.slimscroll.min',
        moment: '../vendor/js/moment/min/moment.min',
        jqueryvalidate: '../vendor/js/jquery-validation/dist/jquery.validate.min',
        AdminLTE: '../vendor/js/AdminLTE/dist/js/app',
        //AdminLTE: '../vendor/js/AdminLTE/dist/js/adminlte.min',
        //icheck: '../vendor/js/AdminLTE/plugins/iCheck/icheck.min',
		backbone: '../vendor/js/backbone/backbone-min',
        'backbone.radio': '../vendor/js/backbone.radio/build/backbone.radio.min',
        bbreadcrumb: '../vendor/js/backbone.breadcrumb/backbone.breadcrumb',
        bpaginator: '../vendor/js/backbone.paginator/lib/backbone.paginator.min',
        backbonefetchcache: '../vendor/js/backbone-fetch-cache/backbone.fetch-cache.min',
        bforms: '../vendor/js/backbone-forms/distribution/backbone-forms.min',
        syphon: '../vendor/js/backbone.syphon/lib/backbone.syphon.min',
        // d3: '../vendor/js/d3/d3.min',
        // c3: '../vendor/js/c3/c3.min',
        select2: '../vendor/js/AdminLTE/plugins/select2/select2.min',
        i18n: '../vendor/js/i18n/i18n',
        css: '../vendor/js/require-css/css.min',
        text: '../vendor/js/text/text',
		marionette: '../vendor/js/backbone.marionette/lib/backbone.marionette.min',
        // bootstrap: '../vendor/js/AdminLTE/bootstrap/js/bootstrap.min',
        //bootstrap: '../vendor/js/try/js/bootstrap.min',
        bootstrap: '../vendor/js/AdminLTE/bower_components/bootstrap/dist/js/bootstrap.min',
        //freelancer: '../vendor/js/try/js/freelancer.min',
       // datetimepicker: '../vendor/js/AdminLTE/plugins/datepicker/bootstrap-datepicker',
        airdatepicker: '../vendor/js/air-datepicker/dist/js/datepicker.min',
        backgridpaginator: '../vendor/js/backgrid-paginator/backgrid-paginator.min',
        backgrid: '../vendor/js/backgrid/backgrid'
	},
	shim: {
        underscore: {
			exports: '_'
		},
        jquery: {
            exports: '$'
        },
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
        },
        marionette: {
			deps: ['underscore', 'jquery', 'backbone', 'backbone.radio'],
			exports: 'Marionette'
		},
        bbreadcrumb: {
            deps: ['backbone'],
            exports: 'backbone.breadcrumb'
        },
        bpaginator: {
			deps: ['backbone'],
			exports: 'backbone.paginator'
        },
        // backgridpaginator: {
		// 	deps: ['backgrid', 'backbone', 'backbone.paginator'],
		// 	exports: 'backgrid-paginator'
        // },
        // backgrid: {
		// 	deps: ['backbone'],
		// 	exports: 'Backgrid'
		// },
        backbonefetchcache: {
			deps: ['backbone'],
			exports: 'Backbone.fetchCache'
        },
        bforms: {
			deps: ['backbone'],
			exports: 'backbone-forms'
		},
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        Cookies: {
			deps: ['jquery'],
			exports: 'Cookies'
		},
        fastclick: {
			deps: ['jquery'],
			exports: 'fastclick'
		},
		slimScroll: {
			deps: ['jquery'],
			exports: 'slimScroll'
		},
        moment: {
            deps: ['jquery'],
            exports: 'moment'
        },
        airdatepicker: {
            exports: 'airdatepicker',
            deps: ['jquery', 'moment']
        },
        // icheck: {
			// deps: ['jquery'],
			// exports: 'icheck'
        // },
        AdminLTE: {
            deps: ['jquery', 'bootstrap'],
            exports: 'AdminLTE'
        },
        select2: {
			deps: ['jquery'],
			exports: 'select2'
		},
	}
});

requirejs([
    'underscore', 'backbone', 'models/Config', 'app', 'router', 'models/App'
], function (_, B, ConfigModel, App, AppRouter, AppModel) {
	'use strict';

    var configModel = new ConfigModel();
    var cfg = configModel.get("app");
    // var cfgext = configModel.get(cfg.appenv);
    
    window.app = new App({config:cfg, model: new AppModel()});
    window.app.loadModules()
    .then(function(modules) {
        var bootedModules = window.app.bootModules(modules);
        window.app.modules = {collection: modules, config: bootedModules.config};
        window.app.menu = bootedModules.lng;
        
        window.router = new AppRouter({
            controller: bootedModules.controller,
            appRoutes: bootedModules.router
        });
        window.app.start();
    })
    .catch(function(err) {
        console.log(err, 'error load modules');
    });
});