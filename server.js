function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDirection(){
	let directions = [-1, 1];
	let direction_chosen_x = Math.floor(Math.random() * directions.length);
	let direction_chosen_y = Math.floor(Math.random() * directions.length);

	let ball_ini_x = 4 * directions[direction_chosen_x];
	let ball_ini_y = getRandomIntInclusive(1, 5) * directions[direction_chosen_y];

	let ball_ini_pos = {
		x: ball_ini_x,
		y: ball_ini_y
	}

	return ball_ini_pos;
}


var ball_initial_dir = generateDirection();


var clients_ids = [1, 1];





var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

io = socket(server);

io.sockets.on('connection', (socket) => {
	console.log("new connection");
	clients_ids.push(socket.id);

	socket.on('disconnect', (socket) => {
		console.log('user disconnected');
	});

	//ball stuff
	//first time
	if (io.engine.clientsCount <= 1) {
		console.log('emitted');
		socket.emit('ball_ini_dir', ball_initial_dir);
	}
	else {
		ball_initial_dir.x *= -1;
		ball_initial_dir.y *= 1;
		console.log('emitted' + ball_initial_dir);

		socket.emit('ball_ini_dir', ball_initial_dir);
	}

	//other times
	socket.on('restart_game', (payload) => {
		ball_initial_dir = generateDirection();


		ball_initial_dir.x *= -1;
		ball_initial_dir.y *= 1;
		console.log('emitted');
		socket.emit('restart_game_response', ball_initial_dir);

		ball_initial_dir.x *= -1;
		ball_initial_dir.y *= 1;
		console.log('emitted' + ball_initial_dir);

		socket.broadcast.emit('restart_game_response', ball_initial_dir);	



	});
	





	socket.on('player_pos', (player) => {
		socket.broadcast.emit('player_pos', player);
	});

	//to start
	let enough_players = {
	enough: true
	}

	if (io.engine.clientsCount >= 2){
		io.sockets.emit('enough_players', enough_players);
	}

	socket.on('start_game', (payload) => {
		io.sockets.emit('start_game_response', {t: true});
	});




	
});



