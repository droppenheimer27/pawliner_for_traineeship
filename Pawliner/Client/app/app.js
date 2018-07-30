define([
    'jquery',
    'backbone',
	'marionette',
    'modules/main/views/IndexView',
    'models/App',
], function ($, B, Mn, IndexView, AppModel) {
	'use strict';

    return Mn.Application.extend({
        region: 'body',
        router: {},
        controller: {},
        config: {},
        indexView: {},
        initialize: function(){
            this.config = this.options.config || {};
            this.model = new AppModel();
            this.model.fetch();
            this.timeoutLoader();
            this.listenTo(B.Radio.channel('main'), 'logout', this.logout);
        },
        onBeforeStart: function() {
            this.loadModel({});
//            this.setupAjax401();
//            this.setupToken(this.model.get("x-access-token"));
            this.contentViewLoader();
        },
        loadModel: function(args) {
            var modelData = {};
            var modelPrev = this.model.toJSON();
            if (_.isEmpty(modelPrev)){
                args.reset = true;
            }
            _.each(window.app.modules.config, function(el) {
                _.extend(modelData, el.appmodel);
            });
            var modelNew = {}
            if (_.has(args, 'reset') && true === args.reset){
                _.extend(modelPrev, modelData);
                modelNew = modelPrev;
            }
            else{
                _.extend(modelData, modelPrev);
                modelNew = modelData;
            }
            this.model.destroy();
            this.model.set(modelNew);
//            if (!_.isUndefined(this.model.get("autologin")) && true === this.model.get("autologin")){
                this.model.save(modelNew);
//                this.setupToken(this.model.get("x-access-token"));
//                if (!_.isUndefined(this.model.get("sessionId")) && !_.isEmpty(this.model.get("sessionId"))){
//                    Cookies.set('PHPSESSID', this.model.get("sessionId"));
//                }
//            }
        },
        onStart: function() {
            B.history.start();
//            var user = this.model.get("user");
//            console.log(user, " <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< user");
//            if (!(true === this.model.get("autologin") && _.has(user, "users_email") && _.has(user, "users_password"))){
//                window.router.navigate('#!/main/login', {trigger: true});
//            }
            // $.AdminLTE.layout.activate();
        },
        timeoutLoader: function() {
//            setInterval(function() {
//                window.app.getChanges({users_id: window.app.model.get("users_id")});
//            }, 60000*window.app.SettingsSession.getKey("intervalChanges"));
        },
        contentViewLoader: function() {
            this.indexView = new IndexView();
            this.showView(this.indexView);
            var self = this;
            B.Radio.channel('main').on('routeChange', function(contentView) {
                self.indexView.getRegion('content').show(contentView);
            });
        },
        loadModules: function (){
            var res = [];
            var p;
            if (_.has(this.config, "modules") && !_.isEmpty(this.config.modules)){
                var _res;
                var configModel = {};
                var cfg = {};
                _.each(this.config.modules, function (module){
                    p = new Promise(function(resolve, reject) {
                        requirejs(["modules/"+ module +"/controller", "modules/"+ module +"/router", "modules/"+ module +"/models/Config", "i18n!modules/"+ module +"/nls/lng"], 
                            function (Controller, Router, ConfigModel, Lng) {
                                _res = {};
                                configModel = new ConfigModel();
                                cfg = configModel.get("app");
                                _res[module] = {controller: Controller, router: Router, config: cfg, lng: Lng};
                                resolve(_res);
                            },
                            function (err) {
                                reject(err);
                            }
                        );
                    });
                    res.push(p);
                });
            }
            return Promise.all(res);
        },
        bootModules: function (modules){
            var res = {
                controller: {}, 
                router: {}, 
                config: {},
                lng: {}
            };
            if (!_.isEmpty(modules)){
                var modules = _.reduce(modules, function(memo, module){
                    _.extend(memo, module);
                    return memo;
                });
                var cfg;
                for (var module in modules) {
                    cfg = {};
                    cfg[module] = modules[module].config;
                    _.extendOwn(res.controller, modules[module].controller);
                    _.extendOwn(res.router, modules[module].router);
                    _.extendOwn(res.config, cfg);
                    if (!_.isUndefined(modules[module].lng.common.menu)){
                        _.extendOwn(res.lng, modules[module].lng.common.menu);
                    }
                }
            }
            return res;
        },
    });
});