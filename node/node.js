var phantom = require('phantom');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'beachturnaje'
});
connection.connect();

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



Sync = function() {

};
Sync.prototype.store = function (data) {
	console.log(data);
};


// connection.end();
