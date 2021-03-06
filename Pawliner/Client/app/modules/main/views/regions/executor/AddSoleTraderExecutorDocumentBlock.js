define([
    'backbone',
    'underscore',
    'marionette',
    'text!../../../templates/regions/executor/AddSoleTraderExecutorDocumentBlock.html'
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
        validateForm: function () {
            this.ui.form.validate({
               ignore: ':hidden',
               rules: {
                    Document: {
                       required: true,
                       extension: 'jpeg|png|gif|pdf'
                   },
               },
               highlight: function (element) {
                   $(element).closest('.input-group').addClass('has-error');
               },
               unhighlight: function (element) {
                   $(element).closest('.input-group').removeClass('has-error');
               },
               errorElement: 'span',
               errorClass: 'help-block',
               errorPlacement: function (error, element) {
                   if (element.parent('.input-group').length) {
                       error.insertAfter(element.parent());
                   } else {
                       error.insertAfter(element);
                   }
               }
           });
        },
        onSubmitForm: function (e) {
            e.preventDefault();
            var self = this;
            
            var file = $('#documentSoleTraderExecutor')[0];
            var formData = new FormData();
            formData.append('Id', this.model.get('Id'));
            formData.append('Document', file.files[0]);

            $.ajax({
                type: 'POST',
                url: '/api/executors/Document',
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function (xhr) {
                    var token = window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'success',
                        headerText: 'Success',
                        bodyText: 'Successfuly sent document!'
                    });

                    $.ajax({
                        type: 'PUT',
                        url: '/api/executors/UpdateStatus',
                        data: {
                            Id: self.model.get('Id'),
                            Status: 'InWaiting'
                        },
                        beforeSend: function (xhr) {
                            var token = window.app.model.get('tokenInfo');
                            xhr.setRequestHeader("Authorization", "Bearer " + token);
                        },
                    });
                },
                error: function (response) {
                    alert('Error');
                }
            });

            B.Radio.channel('main').trigger('refresh');
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
