import * as _ from 'underscore'
import assert from 'assert'
import chai from 'chai'

import {letters, naiveNth, isIndexed, nth, second, compareLessThanOrEqual, lessOrEqual, existy, truthy, comparator} from './one.js'
const should = chai.should();

describe('1.2.4', function () {
	it('naiveNth', function () {
		naiveNth(letters, 2).should.equal('c');
	});

	it('isIndexed', function () {
		isIndexed([1, 2]).should.be.equal(true);
		isIndexed('it is indexed data').should.be.equal(true);
	});

	it('nth', function () {
		nth(letters, 1).should.be.equal('b');
		nth("abc",0).should.be.equal('a');
		should.Throw(
			function() {
				nth({},2);
			}, Error
		);
		should.Throw(
			function() {
				nth(letters, 4000);
			}, Error
		);
		should.Throw(
			function() {
				nth(letters, 'aaaaa');
			}, Error
		);
	});

	it('second', function () {
		second(['a','b']).should.be.equal('b');
		second("fogus").should.be.equal('o');
		should.Throw(
			function() {
				second({});
			}, Error
		);
	});

	it('sort, when no comparator', function () {
		[2,3,-6,0,-108,42].sort().should.be.eql([ -108, -6, 0, 2, 3, 42 ]);
		[0,-1,-2].sort().should.be.eql([ -1, -2, 0 ]);
		[2,3,-1,-6,0,-108,42,10].sort().should.be.eql([ -1, -108, -6, 0, 10, 2, 3, 42 ]);
	});

	it('sort, with comparator', function () {
		[2,3,-1,-6,0,-108,42,10].sort(function(x,y) {
			if (x < y) return -1;
			if (y < x) return 1;
			return 0;
		}).should.be.eql(
			[-108, -6, -1, 0, 2, 3, 10, 42]
		);
		[2,3,-1,-6,0,-108,42,10].sort(compareLessThanOrEqual).should.be.eql(
			[-108, -6, -1, 0, 2, 3, 10, 42]
		);
	});

	it('comparator act weirdly when equal condition', function () {
		compareLessThanOrEqual(1,1).should.be.equal(0);
		_.contains([0,-1], compareLessThanOrEqual(1,1)).should.be.true;
	});

	it('lessOrEqual cannot sort two equal values', function () {
		[100, 1, 0, 10, -1, -2, -1].sort(lessOrEqual).should.be.eql(
			[100,  1,  0, 10, -1, -2, -1]
		);
	});

	it('map predicate function with comparator', function () {
		[100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual)).should.be.eql([-2, -1,  -1, 0, 1, 10, 100]);
	});

});
