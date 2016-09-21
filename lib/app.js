var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(server);

var gameJSON = {};
//configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(__dirname + '/public'));
app.use('/bower', express.static(__dirname + '/bower_components'));
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/phaser', function(req, res) {
    res.render('phaser');
});

app.get('/phaserExample', function(req, res) {
    res.render('phaserExample');
});

server.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

function validateLocation(data)
{
	return true;
}

io.on('connection', function(socket) {
	console.log('client connected');

	io.emit('newClient',{client:socket.id});
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function(data) {
    //     console.log(data);
    // });
	socket.on('updatePosition',function(data){
		// console.log(data);
		if(validateLocation(data))
		{
			gameJSON[socket.id] = data;
		}
	});

    var gameData = setInterval(function() {

        socket.volatile.emit('gameData', gameJSON);

    }, 10);


    socket.on('disconnect', function() {
    	io.emit('disconnect',this.id);
    	delete gameJSON[socket.id];
        clearInterval(gameData);
    });
});
