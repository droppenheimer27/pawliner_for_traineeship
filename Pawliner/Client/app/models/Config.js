define([
	'models/ModelNoUrl'
], function (ModelNoUrl) {
	'use strict';

	return ModelNoUrl.extend({
        defaults: {
            app: {
                version: '1.0.0',
                typeapp: 'web',
                appenv: 'dev',
                startyear: '2017',
                modules: ["main"],
            },
//            dev:{
//                io: {
//                    prot: "ws",
//                    ip: "127.0.0.1",
//                    port: 12443
//                }
//            },
//            prod:{
//                io: {
//                    prot: "ws",
//                    ip: "127.0.0.1",
//                    port: 12443
//                }
//            }
        }
	});
});