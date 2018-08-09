define([
    'backbone',
    'syphon',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/respond/EditRespondBlock.html',
    'modules/main/models/Respond'
], function (B, syphon, $, _, marionette, template, Respond) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        // collection: new Executors,
        initialize: function () {
            // this.collection.fetch();
            // console.log(this.model);
        },
        ui: {
            editRespondForm: 'form[role="form"]',
            removeRespondButton: '#removeRespond'
        },
        events: {
            'submit @ui.editRespondForm': 'onSubmitEditRespondForm',
            'click @ui.removeRespondButton': 'onClickRemoveRespondButton'
        },
        onSubmitEditRespondForm: function (e) {
            e.preventDefault();

            var self = this;
            var data = syphon.serialize(this.ui.editRespondForm);
            data.Id = this.model.get('Id');

            var respond = new Respond();
            respond.set(data);
            respond.save(data, {
                success: function () {
                    $('#model-respond-put' + self.model.get('Id')).modal('hide');
                }
            });

            // this.render();
            //B.Radio.channel('main').trigger('refreshData');
            // console.log(this.model);
        },
        onClickRemoveRespondButton: function (e) {
            e.preventDefault();
            
            var self = this;
            var respond = new Respond();
            respond.fetch({data: {
                Id: this.model.get('Id'),
            }});
            
            $.ajax({
                type: 'DELETE',
                url: '/api/responds/' + this.model.get('Id'),
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    $('#model-respond-put' + self.model.get('Id')).modal('hide');
                },
                error: function (response) {
                    console.log(response);
                }
            });

            // respond.destroy();
           
        }
    });
});
