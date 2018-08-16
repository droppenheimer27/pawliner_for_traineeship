define([
    'backbone',
    'underscore',
    'marionette',
    'text!../../../templates/regions/admin/SubmitExecutorBlock.html'
], function (B, _, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            form: 'form[role="form"]'
        },
        events: {
            'submit @ui.form': 'onSubmitForm'
        },
        onSubmitForm: function (e) {
            e.preventDefault();
            
            console.log('asd');

            $.ajax({
                type: 'PUT',
                url: '/api/executors/UpdateStatus',
                data: {
                    Id: this.model.get('Id'),
                    Status: 'Submited'
                },
                success: function () {
                    B.Radio.channel('main').trigger('refreshExecutorView');
                },
                beforeSend: function (xhr) {
                    var token = window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
            });
        }
    });
});
