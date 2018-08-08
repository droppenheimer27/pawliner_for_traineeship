define([
    'syphon',
    'underscore',
    'marionette',
    'text!../../../templates/regions/order/CreateRespondBlock.html',
    'modules/main/models/Executor',
    'modules/main/models/Respond'
], function (syphon, _, marionette, template, Executor, Respond) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        // collection: new Executors(),
        initialize: function () {
            var self = this;

            $.ajax({
                type: 'GET',
                url: '/api/executors',
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    self.options.ExecutorId = _.find(response, {UserId: window.app.model.get('userId')}).Id;
                },
                error: function (response) {
                    console.log(response);
                }
            });

            // var executor = new Executor();
            // executor.fetch({
            //     data: {
            //         UserId: window.app.model.get('userId')
            //     }
            // })

            // this.options.ExecutorId = _.find(executor, {UserId: window.app.model.get('userId')}).Id;
            //console.log(this.options.ExecutorId)
            // this.collection = new Executors();
            // this.collection.fetch({
            //     data: {
            //         UserId: window.app.model.get('userId')
            //     }
            // });
            // console.log(this.collection);
        },
        ui: {
            form: 'form[role="form"]'
        },
        events: {
            'submit @ui.form': 'onSubmitForm'
        },
        onSubmitForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.form);
            data.UserId = window.app.model.get('userId');
            data.OrderId = parseInt(this.options.OrderId, 10);
            data.ExecutorId = this.options.ExecutorId;
            data.Status = 2;
            console.log(data);

            this.model = new Respond();
            this.model.set(data);
            this.model.save(data, {
                success: function () {
                    $('#modal-default').modal('hide');
                }
            });

            //B.Radio.channel('main').trigger('refreshData');
        }
    });
});
