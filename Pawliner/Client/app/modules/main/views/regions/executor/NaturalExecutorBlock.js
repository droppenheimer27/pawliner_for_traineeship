define([
    'backbone',
    'syphon',
    'underscore',
    'marionette',
    'text!../../../templates/regions/executor/NaturalExecutorBlock.html',
    '../../collections/SelectExecutorServiceCollectionView',
    'modules/main/collections/Services',
    'modules/main/models/Executor'
], function (B, syphon, _, marionette, template, SelectExecutorServiceCollectionView, Services, Executor) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            this.model = new Executor();
        },
        ui: {
            naturalExecutorForm: '#naturalExecutorForm',
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
            'submit @ui.naturalExecutorForm': 'onSubmitNaturalExecutorForm'
        },
        onSubmitNaturalExecutorForm: function (e) {
            e.preventDefault();
            
            var data = syphon.serialize(this.ui.naturalExecutorForm);
            data.Type = this.options.type;
            data.UserId = window.app.model.get('userId');
            console.log(data);
            console.log(this.model);

            this.model.set(data);
            this.model.save(data);

            $.ajax({
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                url: '/api/account/SetUserRole',
                beforeSend: function (xhr) {
                    let token =  window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
            });
        },
        onRender: function () {
            this.showChildView('selectServicesRegion', new SelectExecutorServiceCollectionView({
                collection: new Services()
            }));
        }
    });
});
