define([
    'backbone',
//    './views/LoginView',
//    './views/ProfileView',
    './views/SettingsView',
    './views/Pages',
    './views/IndexView',
    './views/UserProfileView',
    './views/CreateOrderView',
    './views/BecomeExecutorView',
    './views/OrderView',
    './views/RegisterView',
    'modules/main/models/Order'
], function (B/*, LoginView, ProfileView*/, SettingsView, Pages, Index, UserProfile, CreateOrderView, BecomeExecutorView, OrderView, RegisterView, Order) {
    'use strict';

    var channel = B.Radio.channel('main');

    return {
        index: function () {

        },
        register: function () {
            channel.trigger('routeChange', new RegisterView());
        },
        profile: function () {
            channel.trigger('routeChange', new UserProfile());
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