$(document).ready(init);

function init() {
	$.get('/snowday-plot/csv/closings.json', function(d){
		var rows = CSV.parse(d);
		var parsedRows = [];
		for (var i in rows) {
			(function(){
				var j = i;
				parsedRows.push({
					school:rows[i][2],
					type:rows[i][4],
					desc:rows[i][5]
				});
			})();

		}

		for (i in parsedRows) {

		}
		debugger;
	});
}