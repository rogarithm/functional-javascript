import * as _ from 'underscore'

export default Object.freeze({
	lameCSV
});

function lameCSV(str) {
	return _.reduce(
		str.split("\n"),
		function(table, row) {
			table.push(
				_.map(row.split(","), function(c) { return c.trim()})
			);
			return table;
		},
		[]);
}
