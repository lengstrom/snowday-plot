$(document).ready(init);

function init() {
	$.get('/snowday-plot/csv/closings.csv', function(d){
		var rows = CSV.parse(d);
		debugger;
	});
}