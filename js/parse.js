$(document).ready(init);

function init() {
	$.get('../csv/closings.csv', function(d){
		var rows = CSV.parse(d);
		debugger;
	});
}