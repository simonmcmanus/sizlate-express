
var sizlate = require('sizlate');
var __express = require('../index').__express;

describe('When __express is called with layout:false ', function() {

	it("is should render the header view.", function() {
		__express('heading', {
			layout: false,
			settings: {
				views: './spec/views',
				'view engine': 'sizlate'
			},
			selectors: {
				'#insertHere': 'hello there'
			}
		}, function(error, markup) {
			var expected = '<div><span></span><span id="insertHere">hello there</span></div>';
			expect(markup.replace(/\n/g, '')).toEqual(expected);

		});
	 });
});

describe('When __express is called with a layout specified  ', function() {
	it("is should render the header view.", function() {
		__express('heading', {
			layout: 'layout',
			settings: {
				views: './spec/views'
			},
			selectors: {
				'#insertHere': 'hello there'
			}
		}, function(error, markup) {
			var expected = '<html><head></head><body><div id="container"><div><span></span><span id="insertHere">hello there</span></div></div></body></html>';
			expect(markup.replace(/\n/g, '')).toEqual(expected);
		});
	 });
});


describe('When __express is called with a partial..', function() {
	it("is should render the header view.", function() {
		__express('heading', {
			layout: false,
			settings: {
				views: './spec/views'
			},
			selectors: {
				'ul': {
					partial: 'partial',
					data: [
						{'.name': 'bob1'},
						{'.name': 'bob2'},
						{'.name': 'bob3'}
					]
				}
			}
		}, function(error, markup) {
			expect(markup.replace(/\n/g, '')).toEqual('');
		})
	})

});

//
//
// // should default to #contaier
// //
// // // check top level and nested items.
//
// // describe('When passed a settings.views path all files views should be requested from the specified folder.', function() {});
