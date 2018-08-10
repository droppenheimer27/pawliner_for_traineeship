define([
    'backbone',
    'syphon',
    'underscore',
    'marionette',
    'text!../../../templates/regions/executor/EditNaturalExecutorBlock.html',
    '../../collections/SelectExecutorServiceCollectionView',
    'modules/main/collections/Services'
], function (B, syphon, _, marionette, template, SelectExecutorServiceCollectionView, Services) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            selectServicesRegion: '.select-executor-service-region',
            form: 'form[role="form"]',
            removeNaturalExecutor: '#removeNaturalExecutor'
        },
        regions: {
            selectServicesRegion: {
                el: '@ui.selectServicesRegion',
                replaceElement: true
            },
        },
        events: {
            'submit @ui.form': 'onSubmitEditNaturalExecutorForm',
            'click @ui.removeNaturalExecutor': 'onClickRemoveNaturalExecutor'
        },
        onSubmitEditNaturalExecutorForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.form);
            data.Id = this.model.get('Id');
            data.Type = 'NP';
            
            this.model.set(data);
            this.model.save(data, {
                success: function () {
                    $('#model-executor-put').modal('hide');
                }
            })
        },
        onClickRemoveNaturalExecutor: function (e) {
            e.preventDefault();

            $.ajax({
                type: 'DELETE',
                url: '/api/executors/' + this.model.get('Id'),
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    $('#model-executor-put').modal('hide');
                },
                error: function (response) {
                    console.log(response);
                }
            });

            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: '/api/account/RemoveUserRole',
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    var roles = {roles: ''};
                    window.app.model.set(roles);
                    window.app.model.save(roles);
                }
            });
        },
        onRender: function () {
            this.showChildView('selectServicesRegion', new SelectExecutorServiceCollectionView({
                collection: new Services()
            }));
        }
    });
});
