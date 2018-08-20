define([
    'backbone',
    'syphon',
    'underscore',
    'marionette',
    'text!../../../templates/regions/order/CreateRespondBlock.html',
    'modules/main/models/Executor',
    'modules/main/models/Respond',
    'jqueryvalidate'
], function (B, syphon, _, marionette, template, Executor, Respond) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model.on('change', this.changeModel, this);

            var self = this;

            $.ajax({
                type: 'GET',
                url: '/api/executors',
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    self.options.ExecutorId = _.find(response.items, {UserId: window.app.model.get('userId')}).Id;
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
        ui: {
            form: 'form[role="form"]'
        },
        events: {
            'submit @ui.form': 'onSubmitForm'
        },
        changeModel: function () {
            $('#model-default').modal('hide');
        },
        validateForm: function () {
            this.ui.form.validate({
               ignore: ':hidden',
               rules: {
                   Content: {
                       required: true
                   },
               },
               highlight: function(element) {
                   $(element).closest('.input-group').addClass('has-error');
               },
               unhighlight: function(element) {
                   $(element).closest('.input-group').removeClass('has-error');
               },
               errorElement: 'span',
               errorClass: 'help-block',
               errorPlacement: function(error, element) {
                   if(element.parent('.input-group').length) {
                       error.insertAfter(element.parent());
                   } else {
                       error.insertAfter(element);
                   }
               }
           });
        },
        onSubmitForm: function (e) {
            e.preventDefault();

            var data = syphon.serialize(this.ui.form);
            data.UserId = window.app.model.get('userId');
            data.OrderId = parseInt(this.model.get('Id'), 10);
            data.ExecutorId = this.options.ExecutorId;
            data.Status = 2; // Unsubmited respond
            console.log(data);
            
            this.model = new Respond();
            this.model.set(data);
            this.model.save(data, {
                error: function (model, response, error) {
                    B.Radio.channel('main').trigger('messageuihide');
                    B.Radio.channel('main').trigger('saveRespond', model);
                    B.Radio.channel('main').trigger('refresh');
                }
            });
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
