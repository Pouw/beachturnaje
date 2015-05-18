var page = require('webpage').create();
page.open('http://www.beach-ladvi.rezervuju.cz/event/2176/detail', function(status) {
	console.log("Status: " + status);
	if(status === "success") {
		//var title = page.evaluate(function() {
		//      return document.title;
		//});
		//console.log('Page title is ' + title);

		var cl = page.evaluate(function() {
			var out = [];
			var table = document.getElementsByClassName('participation')[0];
			var rows = table.getElementsByTagName('tr');
			var count = rows.length;
			for (var i = 0; i < count; i++) {
				var row = rows[i].getElementsByTagName('td');
				var team = [
					row[0].innerHTML.trim(),
					row[1].innerHTML.trim()
				];
				out.push(team);
			}
			return out;
		});
		console.log(cl);
		page.render('example.png');
	}
	phantom.exit();
});
