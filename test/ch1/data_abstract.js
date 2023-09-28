import * as _ from 'underscore'
import assert from 'assert'
import chai from 'chai'
import data_abstracter from '../../ch1/data_abstract.js'

const should = chai.should();


describe('1.2.5', function () {

	it('what', function () {
		let csv = "name, age, hair\nMerble, 35, red\nBob, 64, blonde";
		console.log(data_abstracter.lameCSV(csv));
	});
});
