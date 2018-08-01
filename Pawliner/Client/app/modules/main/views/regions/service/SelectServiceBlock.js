define([
    'underscore',
    'jquery',
    'marionette',
    'text!../../../templates/regions/service/SelectClassiferServiceBlock.html',
    'modules/main/collections/Services',
    '../../collections/OptionServiceCollectionView'
], function (_, $, marionette, template, Services, OptionServiceCollectionView) {
    'use strict';

    return marionette.View.extend({
        tagName: 'optgroup',
        template: function (tplPrms) {
            return _.template(template)(tplPrms);
        },
        ui: {
            optionRegion: '.option-region'
        },
        regions: {
            optionRegion: {
                el: '@ui.optionRegion',
                replaceElement: true
            }
        },
        // initialize: function () {
        //     this.collection = new Services(this.model.get('ServiceClassifers'));
        //     this.collection.fetch();
        //     console.log(this.collection)
        // },
        onRender: function() {
            this.$el.attr('label', this.model.get('Description'));

            this.showChildView('optionRegion', new OptionServiceCollectionView({
                collection: new Services(this.model.get('ServiceClassifers'))
            }));
        }
    });
});
