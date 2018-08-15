define([
    'underscore',
    'marionette',
    '../regions/admin/EditServiceClassiferBlock'
], function (_, marionette, EditServiceClassiferBlock) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'div',
        className: 'form-group',
        childView: EditServiceClassiferBlock,
    });
});
