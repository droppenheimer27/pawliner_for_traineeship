define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/user/UserBlock.html',
    './UserInfoBlock',
    './UserLoginBlock'
], function (_, $, marionette, template, UserInfoBlock, UserLoginBlock) {
    'use strict';

    return marionette.View.extend({
        initialize: function() {
            window.app.model.on('change:tokenInfo', this.tokenState, this);
        },
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            userBlockRegion: '#user-block-region'
        },
        regions: {
            userBlockRegion: {
                el: '@ui.userBlockRegion',
            }
        },
        tokenState: function () {
            this.render();
        },
        onRender: function() {
            if (_.isEmpty(window.app.model.get('tokenInfo'))) {
                this.showChildView('userBlockRegion', new UserLoginBlock());
            } else {
                this.showChildView('userBlockRegion', new UserInfoBlock());
            }
        }
    });
});
