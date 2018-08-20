define([
    'backbone',
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/admin/SubmitExecutorBlock.html'
], function (B, _, $, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            submit: '.submitExecutor'
        },
        events: {
            'click @ui.submit': 'onClickSubmit'
        },
        onClickSubmit: function (e) {
            e.preventDefault();
            var self = this;
            
            $.ajax({
                type: 'PUT',
                url: '/api/executors/UpdateStatus',
                data: {
                    Id: this.model.get('Id'),
                    Status: 'Submited'
                },
                success: function () {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('refresh');
                },
                beforeSend: function (xhr) {
                    var token = window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
            });
        }
    });
});
