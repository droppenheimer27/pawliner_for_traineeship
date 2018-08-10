define([
    'backbone',
    'syphon',
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/executor/EditExecutorBlock.html',
    'modules/main/collections/Services',
    './EditNaturalExecutorBlock',
    './EditSoleTraderExecutorBlock',
    './EditJuridicalExecutorBlock',
    'css!../../../../../../vendor/js/air-datepicker/dist/css/datepicker.min',
    'css!../../../../../../vendor/js/select2/dist/css/select2.min',
    'css!../../../../../../vendor/css/pawliner',
    'airdatepicker',
    'select2',
], function (B, syphon, _, $, marionette, template, Services, EditNaturalExecutorBlock, EditSoleTraderExecutorBlock, EditJuridicalExecutorBlock) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            selectServiceRegion: '.select-service-region',
            editExecutorTypeRegion: '.edit-executor-type-region',
            form: 'form[role="form"]'
        },
        regions: {
            selectServicesRegion: {
                el: '@ui.selectServiceRegion',
                replaceElement: true
            },
            editExecutorTypeRegion: {
                el: '@ui.editExecutorTypeRegion',
                replaceElement: true
            },
        },
        onRender: function () {
            if (this.model.get('NaturalExecutor') !== null) {
                this.showChildView('editExecutorTypeRegion', new EditNaturalExecutorBlock({model: this.model}));
            } else if (this.model.get('SoleTraderExecutor') !== null) {
                this.showChildView('editExecutorTypeRegion', new EditSoleTraderExecutorBlock({model: this.model}));
            } else {
                this.showChildView('editExecutorTypeRegion', new EditJuridicalExecutorBlock({model: this.model}));
            }
        }
    });
});
