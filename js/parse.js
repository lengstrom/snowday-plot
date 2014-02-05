$(document).ready(init);

function init() {
	$.get('http://static.cbslocal.com/schoolclosings/production/cbs/wbz/NEWSROOM/closings.csv', function(d){
		var rows = CSV.parse(d);
		console.log(rows);
	});
}