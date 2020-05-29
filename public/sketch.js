var player1;
var player1_restart;
var player2;
var player2_restart;

var playerHeight = 75;

var player_data = {};


var ball;

var WIDTH = 600;
var HEIGHT = 600;

var socket;

var enough_players;
var can_run = false;

var restart = false;


function setup() {
	
	createCanvas(WIDTH, HEIGHT);

	player1 = new Player(30, HEIGHT/2 - playerHeight/2);
	player1_restart = {
		x: player1.x,
		y: player1.y
	}

	player2 = new Player(WIDTH - 50, HEIGHT/2 - playerHeight/2);
	player2_restart = {
		x: player2.x, 
		y: player2.y
	}



	//connection and network stuff
	socket = io();

	socket.on('ball_ini_dir', (payload) => {
		console.log('received');
		ball = new Ball(WIDTH/2, HEIGHT/2, payload.x, payload.y, player1, player2);
	});


}

function keyPressed() {
  if (keyCode === 32) {
  	socket.emit('start_game', {t: true});
  }

  else if (keyCode === 82) {
  	socket.emit('restart_game', {t: true});
  }
}


function draw() {
	//checking hings

	//to run
	socket.on('enough_players', (payload) => {
		
		enough_players = true;
		
		
	});

	socket.on('start_game_response', (payload) => {
		can_run = true;
	});

	socket.on('restart_game_response', (payload) => {
		restart = true;

		ball = new Ball(WIDTH/2, HEIGHT/2, payload.x, payload.y, player1, player2);
	});

	
	




	background(0);

	//player 1
	if (keyIsDown(38)){
		player1.move(-1, HEIGHT);
	}
	else if (keyIsDown(40)){
		player1.move(1, HEIGHT);
	}

	player_data = {
		x: player1.x,
		y: player1.y
	}

	//the other player
	socket.emit('player_pos', player_data);


	socket.on('player_pos', (player) => {

		player2.y = player.y;

	});



	
	player1.show();
	player2.show();

	if (ball){
		
		ball.show();

		if (enough_players && can_run) {
			ball.move(HEIGHT);
		}		
	}


	if (restart){

		can_run = false;

		player1.x = player1_restart.x;
		player1.y = player1_restart.y;

		player2.x = player2_restart.x;
		player2.y = player2_restart.x;

		restart = false;


	}


}
