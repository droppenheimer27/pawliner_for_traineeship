define([
    'backbone',
], function (B) {
    'use strict';

    return B.Model.extend({
        idAttribute: 'Id',
        urlRoot : '/api/order',
        defaults: {
            Id: '',
            UserId: '', 
            Header: '',
            Description: '',
            City: '',
            Address: '',
            Price: '',
            CompletedOn: '',
            Name: '',
            PhoneNumber: '',
            ServiceClassiferDescription: '',
            ServiceDescription: '',
            OrderStatus: '',
            Photos: [],
            Responds: [],
            Executor: {
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
                ShortJuredicalName: ''
            },
        },
    });
});