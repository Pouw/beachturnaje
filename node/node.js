var phantom = require('phantom');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'beachturnaje'
});
connection.connect();

var Venue = {};
Venue.LADVI = 1;

function cl (v) {console.log(v);}

function parseLadvi () {
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

function store(data) {
    connection.query('SELECT * FROM participant', function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });
    console.log('kuk');

    for (var i = 0; data.length > i; i++) {
        var team = data[i];
        for (var j = 0; team.length > j; j++) {
            var participant = {name: team[j]};
            // console.log(participant);
            connection.query('INSERT INTO participant SET ?', participant, function(err, result) {
                if (err) throw err;
                console.log(team[j] + ' => ' + result.insertId);
            });
            console.log(connection.sql);
        }
    }
}

/*

phantom.create(function (ph) {
    ph.createPage(function (page) {
        page.open('http://www.beach-ladvi.rezervuju.cz/event/2176/detail', function (status) {
            console.log('Open page status: ' + status);
            if(status === 'success') {
	            var sync = new Sync();
                page.evaluate(parseLadvi, sync.store);
            }
            ph.exit();
        });
    });
});
*/


Sync = function() {
	this.eventsList = [];
};
Sync.prototype.run = function() {
	this.loadEventLists();
};
Sync.prototype.store = function (data) {
	console.log(data);
};
Sync.prototype.loadEventLists = function() {
	var me = this;
	connection.query('SELECT * FROM parse_event_list', function(err, rows) {
		if (!err) {
			me.eventsList = rows;
			me.parseEventsList();
		} else {
			console.log(err);
		}
	});
};
Sync.prototype.parseEventsList = function() {
	for (var i = 0, count = this.eventsList.length; i < count; i++) {
		var eventList = this.eventsList[i];
		this.openEventListUrl(eventList.url);
	}
};
Sync.prototype.openEventListUrl = function(url) {
	var me = this;
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.open(url, function (status) {
				console.log('EventList: ' + status + ' URL: ' + url);
				if(status === 'success') {
					var events = page.evaluate(me.parseEventListLadvi, 'events');
					console.log(events);
					me.openEventsDetailLadvi(events);
					// page.render('example.png');
				}
				ph.exit();
			});
		});
	});
};
Sync.prototype.parseEventListLadvi = function() {
	var table = document.querySelector('table.table.table-admin tbody');
	var rows = table.getElementsByTagName('tr');
	var count = rows.length;
	var events = [];
	for (var i = 0; i < count; i++) {
		var row = rows[i].getElementsByTagName('td');
		var event = {
			venue_id: 1 // Venue.LADVI
		};
		event.date = row[0].innerText.trim();
		event.name = row[1].innerText.trim();
		var capacity = row[2].innerText.trim().split('/');
		event.team = capacity[1];
		event.capacity = capacity[0];
		event.url = row[4].querySelector('a').href;
		event.remote_id = event.url.match(/event\/([0-9]*)\/detail/)[1];

		events.push(event)
	}
	return events;
};
Sync.prototype.openEventsDetailLadvi = function(events) {
	var count = events.length;
	count = 1;
	for (var i = 0; i < count; i++) {
		var event = events[i];
		this.openEventDetailLadvi(event);
	}
};
Sync.prototype.openEventDetailLadvi = function(event) {
	var me = this;
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.open(event.url, function (status) {
				console.log('EventList: ' + status + ' URL: ' + event.url);
				if(status === 'success') {
					page.evaluate(me.parseEventDetailLadvi, me.store, 'x');
					page.render('example.png');
				}
				ph.exit();
			});
		});
	});
};
Sync.prototype.parseEventDetailLadvi = function(event) {
	return event;
};





var sync = new Sync();
sync.run();

connection.end();
