define([
    'underscore',
    'marionette',
    'text!../../../templates/regions/order/RespondBlock.html',
    '../respond/EditRespondBlock',
    '../respond/SubmitRespondBlock',
    '../respond/SubmitedRespondText'
], function (_, marionette, template, EditRespondBlock, SubmitRespondBlock, SubmitedRespondText) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            editBlock: '.edit-respond-block-region',
            submitBlock: '.submit-respond-block-region',
            submitedRespond: '.submited-respond-region'
        },
        regions: {
            editBlock: '@ui.editBlock',
            submitBlock: '@ui.submitBlock',
            submitedRespond: '@ui.submitedRespond'
        },
        onRender: function () {
            if (this.model.get('Executor').UserId === window.app.model.get('userId')) {
                this.showChildView('editBlock', new EditRespondBlock({model: this.model}));
            }

            if (this.model.get('Order').UserId === window.app.model.get('userId')) {
                this.showChildView('submitBlock', new SubmitRespondBlock({model: this.model}));
            }

            if (this.model.get('Status') === 1) {
                this.showChildView('submitedRespond', new SubmitedRespondText());
            }
        }
    });
});
