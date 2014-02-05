var fs = require('fs');
var http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;

var options = {
	hostname: 'static.cbslocal.com',
	port: 80,
	path: '/schoolclosings/production/cbs/wbz/NEWSROOM/closings.csv',
	method: 'GET',
};

var jsonToWrite = [];
var decoder = new StringDecoder();
var req = http.request(options, function(res) {
	res.on('data', function(d) {
		var txt = decoder.write(d);
		console.log(txt);
		var rows = txt.split('\n');
		var completeRows = [];
		for (var row in rows) {
			completeRows.push(rows[row].split(','))
		}
		for (var i in completeRows) {
			(function () {
				var j = i;
				console.log('/maps/api/geocode/json?address=' + encodeURIComponent(completeRows[i][2]) + '%20MA&sensor=false');
				var z = http.request({
					hostname: 'maps.googleapis.com',
					path: '/maps/api/geocode/json?address=' + encodeURIComponent(completeRows[i][2]) + '%20MA&sensor=false',
					method: 'GET',
				}, function(res) {
					res.on('data', function(da){
						try {
							da = decoder.write(da)
							da = JSON.parse(da);
							jsonToWrite.push({
								short_name:da['results'][0]['address_components'][0]['short_name'],
								lat:da['results'][0]['geometry']['location']['lat'],
								lng:da['results'][0]['geometry']['location']['lng']
							});
						}
						catch (err) {
							console.log(da);
						}
					});
				});
				z.end();
				z.on('error', function(e) {
					console.error(e);
				});
			})();
		}
	});
});

fs.writeFileSync(__dirname + '/../json/schoolclosings.json', JSON.stringify(jsonToWrite));

req.end();
req.on('error', function(e) {
	console.error(e);
});