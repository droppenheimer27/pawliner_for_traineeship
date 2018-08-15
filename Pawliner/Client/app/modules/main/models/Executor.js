define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        idAttribute: 'Id',
        urlRoot : '/api/executors',
        defaults: {
            Description: '',
            FirstName: '',
            LastName: '',
            Patronymic: '',
            NaturalExecutor: {},
            SoleTraderExecutor: {},
            JuridicalExecutor: {},
            Photos: [],
            ServiceClassifersIds: [],
            Type: '',
            PayerAccountNumber: '',
            FullJuredicalName: '',
            ShortJuredicalName: '',
            PhoneNumber: '',
            Comments: [],
            UserId: '', 
            User: {
                AvatarPath: '',
                Photo: {
                    Path: ''
                }
            }
        },
    });
});