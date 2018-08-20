define([
    'backbone',
    'underscore',
    'marionette',
    'text!../../../templates/regions/admin/ExecutorRow.html',
    './SubmitExecutorBlock'
], function (B, _, marionette, template, SubmitExecutorBlock) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        tagName: 'tr',
        ui: {
            submit: '.submit-executor'
        },
        events: {
            'click @ui.submit': 'onClickSubmitButton'
        },
        onClickSubmitButton: function (e) {
            e.preventDefault();
            
            B.Radio.channel('main').trigger('messageview', {
                typeHeader: 'success',
                headerText: 'Executor #' + this.model.get('Id'),
                bodyText: new SubmitExecutorBlock({model: this.model})
            });
        },
    });
});
