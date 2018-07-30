define([
    'jquery',
    'underscore',
    'backbone',
	'marionette',
], function ($, _, B, Mn) {
	'use strict';

	return Mn.Object.extend({
        data: {},
        number: 0,
        initialize: function() {
            var data = this.options.data || {};
            var total = this.paper(parseFloat(data.Paper1), parseFloat(data.Paper2), parseInt(data.CoefPaper));
            _.extend(this.data, {calc_paper:  (this.paper(parseFloat(data.Paper1), parseFloat(data.Paper2), parseInt(data.CoefPaper))).toFixed(1)});
            _.extend(this.data, {calcpaint: (this.paint(total, parseInt(data.CoefPaint))).toFixed(5)});
            _.extend(this.data, {calcfilm: (this.film(parseFloat(data.Film1), parseFloat(data.Film2), parseInt(data.CoefFilm)).toFixed(3))});
            _.extend(this.data, {calcclamp: this.clamp(parseFloat(data.Circulation2), parseInt(data.Clamps))});
            _.extend(this.data, {bundle: (this.paper_bundle(total, parseFloat(data.Bundle))).toFixed(3)});
            _.extend(this.data, {round_paint: (this.paint(total, parseInt(data.CoefPaint))).toFixed(3)});
            _.extend(this.data, {isbn: 1});
            _.extend(this.data, {cover: parseFloat(data.Circulation2)});
            _.extend(this.data, {glue:(this.glue(parseFloat(data.Circulation1), parseFloat(data.Plan)).toFixed(3))});
        },
        paper: function(field_one, field_two, coef) {
            if (coef <= 0 || _.isUndefined(coef)) {
                return 0;
            }
            return (field_two - field_one) / coef; 
        },
        total_paper: function(paper, coef) {
            if (coef <= 0 || _.isUndefined(coef)) {
                return 0;
            }
            return paper / coef;
        },
        paint: function(paper, coef) {
            if (coef <= 0 || _.isUndefined(coef)) {
                return 0;
            }
            return paper / coef; 
        },
        film: function(field_one, field_two, coef) {
            if (coef <= 0 || _.isUndefined(coef)) {
                return 0;
            }
            return (field_two - field_one) / coef; 
        },
        clamp: function(plan, coef) {
            if (coef <= 0 || _.isUndefined(coef)) {
                return 0;
            }
            return plan * coef;
        },
        glue: function(plane, pages) {
            if (plane <= 0 || _.isUndefined(plane)) {
                return 0;
            }
            return (plane * pages) / 1000 / 100;
        },
        paper_bundle: function(paper, coef) {
            if (coef <= 0 || _.isUndefined(coef)) {
                return 0;
            }
            return paper / coef;
        },
        getData: function() {
            console.log(this.data, "this.data");
            return this.data;
        },
        _getDataForScroll: function() {
//            var els = $(".reports-content").find('.reports-area');
            var els = $(".reports-content").find('.reports-area-header');
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            return {els: els, docViewTop: docViewTop, docViewBottom: docViewBottom};
        }
	});
});