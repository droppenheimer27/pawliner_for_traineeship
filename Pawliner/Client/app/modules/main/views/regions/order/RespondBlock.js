define([
    'backbone',
    'underscore',
    'marionette',
    'text!../../../templates/regions/order/RespondBlock.html',
    '../respond/EditRespondBlock',
    '../respond/SubmitRespondBlock',
    '../respond/SubmitedRespondText'
], function (B, _, marionette, template, EditRespondBlock, SubmitRespondBlock, SubmitedRespondText) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model.on('sync', this.onSync, this);
        },
        ui: {
            edit: '.edit-respond',
            submit: '.submit-respond',
            // editBlock: '.edit-respond-block-region',
            // submitBlock: '.submit-respond-block-region',
            submitedRespond: '.submited-respond-region'
        },
        events: {
            'click @ui.edit': 'onClickEditButton',
            'click @ui.submit': 'onClickSubmitButton'
        },
        regions: {
            // editBlock: '@ui.editBlock',
            // submitBlock: '@ui.submitBlock',
            submitedRespond: '@ui.submitedRespond'
        },
        onSync: function () {
            this.render();
        },
        onClickEditButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Edit the respond',
                bodyText: new EditRespondBlock({model: this.model})
            });
        },
        onClickSubmitButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Submit the respond',
                bodyText: new SubmitRespondBlock({model: this.model})
            });
        },
        onRender: function () {
            // if (this.model.get('Order').UserId === window.app.model.get('userId')) {
            //     this.showChildView('submitBlock', new SubmitRespondBlock({model: this.model}));
            // }
            if (this.model.get('Status') === 1) {
                this.showChildView('submitedRespond', new SubmitedRespondText());
            }
        }
    });
});
