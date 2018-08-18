define([
    'backbone',
    'underscore',
    'marionette',
    './ExecutorRow'
], function (B, _, marionette, RowView) {
    'use strict';

    return marionette.CollectionView.extend({
        tagName: 'tbody',
        childView: RowView,
        initialize: function () {
            this.listenTo(B.Radio.channel('main'),'refreshCollection', this.refresh);
            this.collection.fetch();
        },
        refresh: function () {
            this.render();
        }
    });
});

// define([
//     'underscore',
//     '../../collections/ExecutorCollectionView',
//     './ExecutorRow',
//     'modules/main/collections/Executors'
// ], function (_, ExecutorCollectionView, RowView, Executors) {
//     'use strict';

//     return ExecutorCollectionView.extend({
//         tagName: 'tbody',
//         childView: RowView,
//         initialize: function () {
//             this.RadioName = this.options.RadioName;
//             // this.perPage = this.options.PerPage;
//             this.collection = new Executors();
//             this.fetchData();
//         }
//     });
// });