define([
    'backbone',
    'underscore',
    'marionette',
    'text!../templates/ModalView.html',
], function (B, _, marionette, template) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            dialog: '.bgs-modalui',
            header: '.modal-header',
            title: '.modal-title',
            body: '.modal-body',
            modaldialog: '.modal-dialog'
        },
        regions: {
            body: '@ui.body',
        },
        initialize: function(){
            this.initVent();
        },
        initVent: function() {
            this.listenTo(B.Radio.channel('main'), 'messageui', this.showModal);
            this.listenTo(B.Radio.channel('main'), 'messageview', this.showModalView);
            this.listenTo(B.Radio.channel('main'), 'messageuihide', this.hideModal);
        },
        showModal: function (args) { 

            var classMatch = $(this.ui.header).attr('class').match(/\balert-(.*)+\b/g, '');
            if (!_.isNull(classMatch)) {
                var self = this;
                $.each(classMatch, function (idx, cls) {
                   $(self.ui.header).removeClass(cls); 
                });
            }
            $(this.ui.header).addClass('alert-' + args.typeHeader);
            $(this.ui.title).text(args.headerText);

            if (!$(this.ui.dialog).hasClass('in')) {
                $(this.ui.body).html(args.bodyText);
            } else {
                $(this.ui.body).html($(this.ui.body).html() + '<hr class="divider">' + args.bodyText);
            }

            $(this.ui.dialog).modal('show');
        },
        showModalView: function (args) {
            var bodyRegion = this.getRegion('body');
            bodyRegion.show(args.bodyText);
            $(this.ui.header).addClass('alert-' + args.typeHeader);
            $(this.ui.title).text(args.headerText);
            $(this.ui.modaldialog).css({'width': '80%'});
            $(this.ui.dialog).modal('show');
        },
        hideModal: function () {
            $(this.ui.modaldialog).css({'width': ''});
            $(this.ui.dialog).modal('hide');
        }
    });
});