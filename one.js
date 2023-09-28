import * as _ from 'underscore'

export {addArrayElements, letters, naiveNth, isIndexed, nth, second, compareLessThanOrEqual, lessOrEqual, existy, truthy, comparator}

function splat(fun) {
	return function(array) {
		return fun.apply(null, array);
	};
}

var addArrayElements = splat(function(x, y) { return x + y });

//1.2.4
const letters = ['a', 'b', 'c'];

function naiveNth(a, index) {
	return a[index];
}

function isIndexed(data) {
	return _.isArray(data) || _.isString(data);
}

function fail(thing) {
	throw new Error(thing);
}

function nth(a, index) {
	if (!_.isNumber(index)) fail("Expected a number as the index");
	if (!isIndexed(a)) fail("Not supported on non-indexed type");
	if ((index < 0) || (index > a.length - 1))
		fail("Index value is out of bounds");

	return a[index];
}

function second(a) {
	return nth(a, 1);
}

function compareLessThanOrEqual(x, y) {
	if (x < y) return -1;
	if (y < x) return 1;
	return 0;
}

function lessOrEqual(x, y) {
	return x <= y;
}

function existy(x) {
	return x != null;
}

function truthy(x) {
	return (x !== false) && existy(x);
}

function comparator(pred) {
	return function(x, y) {
		if (truthy(pred(x, y)))
			return -1;
		else if (truthy(pred(y, x)))
			return 1;
		else
			return 0;
	};
}
