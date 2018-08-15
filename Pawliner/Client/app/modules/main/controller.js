define([
    'backbone',
    './views/SettingsView',
    './views/Pages',
    './views/IndexView',
    './views/UserProfileView',
    './views/CreateOrderView',
    './views/BecomeExecutorView',
    './views/OrderView',
    './views/ExecutorView',
    './views/RegisterView',
    './views/AdminPanelView',
    'modules/main/models/Order',
    'modules/main/models/Executor'
], function (B, SettingsView, Pages, Index, UserProfile, CreateOrderView, BecomeExecutorView, OrderView, ExecutorView,  RegisterView, AdminPanelView, Order, Executor) {
    'use strict';

    var channel = B.Radio.channel('main');

    return {
        index: function () {

        },
        register: function () {
            console.log("register");
            channel.trigger('routeChange', new RegisterView());
        },
        profile: function () {
            channel.trigger('routeChange', new UserProfile());
        },
        adminpanel: function () {
            channel.trigger('routeChange', new AdminPanelView());
        },
        placeorder: function () {
            channel.trigger('routeChange', new CreateOrderView());
        },
        becomeexecutor: function () {
            channel.trigger('routeChange', new BecomeExecutorView());
        },
        order: function (id) {
            channel.trigger('routeChange', new OrderView({model: new Order({Id: id})}));
        },
        executor: function (id) {
            channel.trigger('routeChange', new ExecutorView({model: new Executor({Id: id})}));
        },
        pages: function (pagename) {
            if (!pagename) {
                pagename = 'unknown';
            }
            new Promise(function(resolve, reject) {
                requirejs(['text!./modules/main/templates/Pages/'+ pagename +'.html'], function (content) {
                    resolve(content);
                },
                function (err) {
                    reject(err);
                });
            })
            .then(function(content) {
                channel.trigger('routeChange', new Pages({pagename: pagename, content: content}));
            })
            .catch(function(err) {
                console.log(err, 'main loadPage error');
            });
        },
//        profile: function() {
//            channel.trigger('routeChange', new ProfileView());
//        },
//        login: function() {
//            channel.trigger('routeChange', new LoginView());
//        },
        settings: function() {
            channel.trigger('routeChange', new SettingsView());
        },
	};
});