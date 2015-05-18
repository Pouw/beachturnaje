var casper = require('casper').create();

function parseLadvi() {
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
}

casper.start('http://www.beach-ladvi.rezervuju.cz/event/2176/detail', function() {
	this.echo(this.getTitle());
	this.echo(this.evaluate(parseLadvi));
});

//casper.thenOpen('http://phantomjs.org', function() {
//	this.echo(this.getTitle());
//});

casper.run();
