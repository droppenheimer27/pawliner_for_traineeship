define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/order/RespondBlock.html',
    '../respond/EditRespondBlock'
], function (_, marionette, template, EditRespondBlock) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            editBlock: '.edit-respond-block-region'
        },
        regions: {
            editBlock: '@ui.editBlock'
        },
        onRender: function () {
            if (this.model.get('Executor').UserId === window.app.model.get('userId')) {
                this.showChildView('editBlock', new EditRespondBlock({model: this.model}));
            }
        }
    });
});
