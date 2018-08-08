define([
    'underscore',
    'jquery',
    'marionette',
    'text!../templates/BecomeExecutorView.html',
    './regions/executor/ExecutorTypeBlock',
    './regions/executor/NaturalExecutorBlock',
    './regions/executor/SoleTraderExecutorBlock',
    './regions/executor/JuridicalExecutorBlock'
], function (_, $, Mn, template, ExecutorTypeBlock, NaturalExecutorBlock, SoleTraderExecutorBlock, JuridicalExecutorBlock) {
    'use strict';

    return Mn.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            executorBlockRegion: '#executor-block-region',
            naturalExecutorBlock: '#naturalExecutor',
            soleTraderExecutorBlock: '#soleTraderExecutor',
            juridicalExecutor: '#juridicalExecutor'
        },
        events: {
            'click @ui.naturalExecutorBlock': 'toNaturalExecutorBlock',
            'click @ui.soleTraderExecutorBlock': 'toSoleTraderExecutorBlock',
            'click @ui.juridicalExecutor': 'toJuridicalExecutorBlock'
        },
        regions: {
            content: '.content',
            executorBlockRegion: {
                el: '@ui.executorBlockRegion'
            }
        },
        toNaturalExecutorBlock: function (e) {
            e.preventDefault();
            this.showChildView('executorBlockRegion', new NaturalExecutorBlock({type: 'NP'}));
        },
        toSoleTraderExecutorBlock: function (e) {
            e.preventDefault();
            this.showChildView('executorBlockRegion', new SoleTraderExecutorBlock({type: 'ST'}));
        },
        toJuridicalExecutorBlock: function (e) {
            e.preventDefault();
            this.showChildView('executorBlockRegion', new JuridicalExecutorBlock({type: 'JP'}));
        },
        onRender: function () {
            this.showChildView('executorBlockRegion', new ExecutorTypeBlock());
        }
    });
});
