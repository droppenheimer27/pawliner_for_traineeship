define([
    'backbone',
    'syphon',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/respond/SubmitRespondBlock.html',
    './SubmitedRespondText',
    'modules/main/models/Respond'
], function (B, syphon, $, _, marionette, template, SubmitedRespondText, Respond) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            submitRespondButton: '.submitRespond'
        },
        events: {
            'click @ui.submitRespondButton': 'onClickSubmitRespondButton'
        },
        onClickSubmitRespondButton: function (e) {
            e.preventDefault();

            $.ajax({
                type: 'PUT',
                url: '/api/responds/UpdateStatus',
                data: {
                    Id: this.model.get('Id'),
                    Status: 1
                },
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    $('#model-submit-respond-put' + this.model.get('Id')).modal('hide');
                },
                error: function (response) {
                    console.log(response);
                }
            });

            $.ajax({
                type: 'PUT',
                url: '/api/order/UpdateStatus',
                data: {
                    Id: this.model.get('OrderId'),
                    Status: 'Submit'
                },
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
    });
});
