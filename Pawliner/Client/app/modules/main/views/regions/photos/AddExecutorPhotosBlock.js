define([
    'backbone',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/photos/AddExecutorPhotosBlock.html',
    '../../collections/ExecutorPhotosCollectionView',
    'modules/main/collections/Executors'
], function (B, $, _, marionette, template, ExecutorPhotosCollectionView, Executors) {
    'use strict';

    return marionette.View.extend({
        template: function(tplPrms) {
            return _.template(template)(tplPrms);
        },
        initialize: function () {
        },
        ui: {
            addPhotosForm: 'form[role="form"]'
        },
        events: {
            'submit @ui.addPhotosForm': 'onSubmitAddPhotosForm'
        },
        regions: {
            photosRegion: '@ui.photosRegion',
        },
        validateForm: function () {
            this.ui.addPhotosForm.validate({
               ignore: ':hidden',
               rules: {
                    Photos: {
                       required: true,
                       extension: 'jpeg|png|gif'
                   },
               },
               highlight: function(element) {
                   $(element).closest('.input-group').addClass('has-error');
               },
               unhighlight: function(element) {
                   $(element).closest('.input-group').removeClass('has-error');
               },
               errorElement: 'span',
               errorClass: 'help-block',
               errorPlacement: function(error, element) {
                   if(element.parent('.input-group').length) {
                       error.insertAfter(element.parent());
                   } else {
                       error.insertAfter(element);
                   }
               }
           });
        },
        onSubmitAddPhotosForm: function (e) {
            e.preventDefault();

            var files = $('#executorPhotos').files;
            var formData = new FormData();

            formData.append('Id', this.model.get('Id'));
            for (var i = 0, len = document.getElementById('executorPhotos').files.length; i < len; i++) { // rewrite with something beutiful
                formData.append('file' + i, document.getElementById('executorPhotos').files[i]);
            }

            $.ajax({
                type: 'POST',
                url: '/api/executors/Gallery',
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function (xhr) {
                    var token = window.app.model.get('tokenInfo');
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                },
                success: function (response) {
                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'success',
                        headerText: 'Success',
                        bodyText: 'Successfuly added photos!'
                    });
                },
                error: function (response) {
                    alert('Error');
                }
            });
            
            B.Radio.channel('main').trigger('refresh');
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
