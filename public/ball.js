class Ball{
	constructor(x, y, ini_x, ini_y, player1, player2){

		this.ballPos = createVector(x, y);



		// var initial_x = 4 * random([-1, 1]);
		// var initial_y = random(1, 5) * random([-1, 1]);


		this.movementVector = createVector(ini_x, ini_y);


		

		this.player1 = player1;
		this.player2 = player2;

		this.canReflect1 = true;
		this.canReflect2 = true;


	}

	//FIGURE OUT A WAY TO MOVE WITHOUT THIS WHOLE WEIRD THING
	//YOU CAN DO BETTER I BELIEVE IN YOU
	move(wh){
		//normals to make reflection work
		let normalUp = createVector(0, -30);
		let normalDown = createVector(0, 30);

		let normalP1 = createVector(30, 0);
		let normalP2 = createVector(-30, 0);




		this.movementVector.x += this.movementVector.x * 0.0025 * deltaTime/100;
		this.movementVector.y += this.movementVector.y * 0.0025 * deltaTime/100;




		//add movement to the ball
		this.ballPos.add(this.movementVector);


		//up and down limits
		if (this.ballPos.y <= 1){
			console.log("reflected");


			this.movementVector.reflect(normalUp);
		}

		if (this.ballPos.y >= wh){
			this.movementVector.reflect(normalDown);
		}

		//collision with player 1 (left side)
		if (this.ballPos.x <= 10 + this.player1.x + this.player1.width && this.ballPos.x > this.player1.x -10 && this.ballPos.y > this.player1.y && this.ballPos.y < this.player1.y + this.player1.height){
			
			if (this.canReflect1 == true){
				
				this.movementVector.reflect(normalP1);
				this.canReflect1 = false;
				this.canReflect2 = true;
			}
		}

		//collision with player 2 (right side)
		if (this.ballPos.x >= this.player2.x - 10 && this.ballPos.x < this.player2.x + 10 + this.player2.width && this.ballPos.y > this.player2.y && this.ballPos.y < this.player2.y + this.player2.height){
			
			if (this.canReflect2 == true){
				
				this.movementVector.reflect(normalP2);
				this.canReflect1 = true;
				this.canReflect2 = false;
			}
		}



	}



	show(){
		fill(255);
		ellipse(this.ballPos.x, this.ballPos.y, 20);
	}
}



