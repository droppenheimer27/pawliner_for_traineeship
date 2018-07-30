define([
	'models/ModelNoUrl'
], function (ModelNoUrl) {
	'use strict';

	return ModelNoUrl.extend({
        defaults: {
            app: {
                version: '1.0.0',
                typeapp: 'web',
                appenv: 'development',
                tst: 'main',
                appmodel: {
                    connected: false,
                    login: false,
                    autologin: false,
                    user: {
                        user_name: 'Anonymous',
                        user_email: ''
                    },
                    "tokenInfo": '',
                },
                limit: 10,
                pagelinkssize: 5,
                searchmin: 2,
                cache: true,
                cacheexpires: 60000
            }
        }
	});
});
