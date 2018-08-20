define([
    'backbone',
    'jquery',
    'underscore',
    'marionette',
    'text!../../../templates/regions/photos/AddOrderPhotosBlock.html',
    '../../collections/OrderPhotosCollectionView',
    'modules/main/collections/Orders'
], function (B, $, _, marionette, template, OrderPhotosCollectionView, Orders) {
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

            var files = $('#orderPhotos').files;
            var formData = new FormData();

            formData.append('Id', this.model.get('Id'));
            for (var i = 0, len = document.getElementById('orderPhotos').files.length; i < len; i++) { 
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
                success: function () {
                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'success',
                        headerText: 'Add photos',
                        bodyText:  'Successfuly added photos!'
                    });

                    B.Radio.channel('main').trigger('refresh');
                },
                error: function () {
                    B.Radio.channel('main').trigger('messageui', {
                        typeHeader: 'error',
                        headerText: 'Error',
                        bodyText:  'While adding photos occured error'
                    });
                }
            });  
        },
        onRender: function () {
            this.validateForm();
        }
    });
});
