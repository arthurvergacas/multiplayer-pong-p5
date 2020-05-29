class Player {

	constructor(x, y){
		this.x = x;
		this.y = y;

		this.height = 70;
		this.width = 10;

		this.speed = 25;
	}

	show() {
		fill(255);
		rect(this.x, this.y, this.width, this.height);
	}

	move(direction, wh){
		let temp = this.y;

		temp += this.speed * direction * (deltaTime / 50);

		if (temp > 0 && direction < 0){
			this.y = temp;
		}
		if (temp < wh - this.height && direction > 0){
			this.y = temp;
		}


		
		
				
	}
}