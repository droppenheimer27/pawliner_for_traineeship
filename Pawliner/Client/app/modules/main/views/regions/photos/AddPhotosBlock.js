define([
    'backbone',
    'syphon',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/photos/AddPhotosBlock.html',
    '../../collections/OrderPhotosCollectionView',
    'modules/main/collections/Orders'
], function (B, syphon, $, _, marionette, template, OrderPhotosCollectionView, Orders) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
            // this.collection.fetch();
            console.log(this.model, 'add-photos-block');
        },
        ui: {
            photosRegion: '.photos-region-add',
            addPhotosForm: 'form[role="form"]'
        },
        events: {
            'submit @ui.addPhotosForm': 'onSubmitAddPhotosForm'
        },
        regions: {
            photosRegion: '@ui.photosRegion',
        },
        onSubmitAddPhotosForm: function (e) {
            e.preventDefault();

            var files = $('#orderPhotos').files;
            var formData = new FormData();

            formData.append('Id', this.model.get('Id'));
            for (var i = 0, len = document.getElementById('orderPhotos').files.length; i < len; i++) { // rewrite with something beutiful
                formData.append('file' + i, document.getElementById('orderPhotos').files[i]);
            }

            $.ajax({
                type: 'POST',
                url: '/api/order/Gallery',
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function (xhr) {
                    var token = window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    alert("Successfully add photos!");
                },
                error: function (response) {
                    alert('Error');
                }
            });  
        },
        onRender: function () {
            this.showChildView('photosRegion', new OrderPhotosCollectionView({
                collection: new Orders(this.model.get('Photos'))
            }));

            $(function() {
                $( '#gallery-add' ).jGallery();
            });
        }
    });
});
