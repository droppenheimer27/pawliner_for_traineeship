define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/user/UserInfoBlock.html'
], function (_, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            logout: '#logout',
        },
        events: {
            "click @ui.logout": "onLogout"
        },
        onLogout: function (e) {;
            e.preventDefault();

            var args = {
                tokenInfo: '',
                userId: '',
                roles: ''
            };
            window.app.model.set(args);
            window.app.model.save(args);
        }
    });
});
