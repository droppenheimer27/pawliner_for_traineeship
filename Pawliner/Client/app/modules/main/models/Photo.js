define([
    '../../../models/ModelNoUrl'
], function (ModelNoUrl) {
    'use strict';

    return ModelNoUrl.extend({
        idAttribute: 'Id',
        defaults: {
            Id: '',
            Path: '',
            FileName: ''
        },
    });
});