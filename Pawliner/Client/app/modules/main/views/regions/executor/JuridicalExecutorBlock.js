define([
    'syphon',
    'underscore',
    'marionette',
    'text!../../../templates/regions/executor/JuridicalExecutorBlock.html',
    '../../collections/SelectExecutorServiceCollectionView',
    'modules/main/collections/Services',
    'modules/main/models/Executor'
], function (syphon, _, marionette, template, SelectExecutorServiceCollectionView, Services, Executor) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model = new Executor();
        },
        ui: {
            juridicalExecutorForm: '#juridicalExecutorForm',
            selectServiceRegion: '.select-executor-service-region',
            executorServicesRegion: '.executor-services-region'
        },
        regions: {
            content: '.content',
            selectServicesRegion: {
                el: '@ui.selectServiceRegion',
                replaceElement: true
            },
            executorServicesRegion: {
                el: '@ui.executorServicesRegion',
                replaceElement: true
            },
        },
        events: {
            'submit @ui.juridicalExecutorForm': 'onSubmitJuridicalExecutorForm'
        },
        onSubmitJuridicalExecutorForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.juridicalExecutorForm);
            data.Type = this.options.type;
            data.UserId = window.app.model.get('userId');
            console.log(data);
            console.log(this.model);

            this.model.set(data);
            this.model.save(data, {
                success: function (response) {
                    $('#model-create-executor').modal('show');
                }
            });

            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: '/api/account/SetUserRole',
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function () {
                    var roles = {roles: 'Executor'};
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
