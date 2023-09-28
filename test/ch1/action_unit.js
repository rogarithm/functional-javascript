import * as _ from 'underscore'
import assert from 'assert'
import chai from 'chai'

import {letters, isIndexed, nth, second, compareLessThanOrEqual, lessOrEqual, existy, truthy, comparator} from '../../ch1/action_unit.js'
const should = chai.should();

describe('1.2.4', function () {
	describe('isIndexed', function () {
		it('배열과 문자열 타입 데이터에 인덱스를 쓸 수 있다', function () {
			isIndexed([1, 2]).should.be.equal(true);
			isIndexed('it is indexed data').should.be.equal(true);
		});
	});

	describe('nth', function () {
		it('인덱스를 쓸 수 있는 데이터일 경우 nth로 n번째 데이터를 가져올 수 있다', function () {
			nth(letters, 1).should.be.equal('b');
			nth("abc",0).should.be.equal('a');
		});

		it('인덱스를 쓸 수 없는 데이터일 경우 nth는 에러를 던진다', function () {
			should.Throw(
				function() {
					nth({},2);
				}, Error
			);
		});

		it('입력된 데이터의 인덱스 범위를 넘어가면 nth는 에러를 던진다', function () {
			should.Throw(
				function() {
					nth(letters, 4000);
				}, Error
			);
		});

		it('인덱스로 쓸 값이 유효하지 않으면 nth는 에러를 던진다', function () {
			should.Throw(
				function() {
					nth(letters, 'aaaaa');
				}, Error
			);
		});
	});

	describe('second', function () {
		it('배열에서 두 번째 값을 가져온다', function () {
			second(['a','b']).should.be.equal('b');
		});
		it('문자열에서 두 번째 값을 가져온다', function () {
			second("fogus").should.be.equal('o');
		});
		it('값이 유효하지 않으면 에러를 던진다', function () {
			should.Throw(
				function() {
					second({});
				}, Error
			);
		});
	});

	describe('sort', function () {
		it('comparator가 없으면 문자열 값으로 정렬한다', function () {
			[2, 3, -6, 0, -108, 42].sort().should.be.eql([-108, -6, 0, 2, 3, 42]);
			[0, -1, -2].sort().should.not.be.eql([-2, -1, 0]);
			[2, 3, -1, -6, 0, -108, 42, 10].sort().should.not.be.eql([-108, -6, -1, 0, 2, 3, 10, 42]);
		});

		it('sort에 comparator를 넘겨줄 수 있다', function () {
			[2, 3, -1, -6, 0, -108, 42, 10].sort(function(x, y) {
				if (x < y) return -1;
				if (y < x) return 1;
				return 0;
			}).should.be.eql(
				[-108, -6, -1, 0, 2, 3, 10, 42]
			);
		});


		it('외부에서 정의한 comparator를 넘겨줄 수 있다', function () {
			[2, 3, -1, -6, 0, -108, 42, 10].sort(compareLessThanOrEqual)
				.should.be.eql(
					[-108, -6, -1, 0, 2, 3, 10, 42]
				);
		});
	});

	describe('comparator', function () {
		it('위에서 정의한 comparator는 x>y과 x=y를 다르게 처리한다', function () {
			compareLessThanOrEqual(1,1).should.not.be.equal(1);
			compareLessThanOrEqual(1,1).should.not.be.equal(-1);
		});

		it('lessOrEqual은 x>y과 x=y를 동일하게 처리한다', function () {
			[100, 1, 0, 10, -1, -2, -1].sort(lessOrEqual).should.be.eql(
				[100,  1,  0, 10, -1, -2, -1]
			);
		});

		it('comparator 함수를 predicate 함수를 넣어서 쓰는 방식으로 일반화시킬 수 있다', function () {
			[100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual))
				.should.be.eql([-2, -1,  -1, 0, 1, 10, 100]);
		});
	});
});
