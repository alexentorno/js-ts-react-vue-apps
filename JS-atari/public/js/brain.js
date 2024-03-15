export class Paddle {
    width = 150;
    height = 40;
    left = 0; // x - vasakult poolt ekraani maa 
    top = 0; // y - korgus ekraanil

    color = 'blue';

    #isMoving = false;
    #intervalId = null;

    constructor(left, top, color) {
        this.left = left;
        this.top = top;
        this.color = color;
    }

    validateAndFixPosition(borderThickness) {
        if (this.left < borderThickness) {
            this.left = borderThickness;
            clearInterval(this.#intervalId);
            this.#intervalId = null;
            //console.log('Interval in cleared')
            //console.log(this.#intervalId)
        }

        if ((this.left + this.width) > 1000 - borderThickness) {
            this.left = (1000 - borderThickness) - (this.width);
            clearInterval(this.#intervalId);
            this.#intervalId = null;
            //console.log('Interval in cleared')
            //console.log(this.#intervalId)
        }
        //console.log(this.left);
    }

    startMove(step, borderThickness) {
        if (this.#intervalId !== null){
            //console.log(this.#intervalId)
            console.log(this.top)
            return;
        } 

        this.#intervalId = setInterval(() => {
            this.left += step * 30;
            // 0 - border
            this.validateAndFixPosition(borderThickness);

        }, 40);

    }

    stopMove(borderThickness) {
        if (!this.#intervalId) return;
        clearInterval(this.#intervalId);
        this.#intervalId = null;
        this.validateAndFixPosition(borderThickness);
    }

    detectBallCollision(ball) {
        if (
            this.left < ball.left + ball.width &&
            this.left + this.width > ball.left &&
            this.top < ball.top + ball.height &&
            this.top + this.height > ball.top
        ) {
            return true;
        }
        return false;
    }

}


export class Ball {
    width = 20;
    height = 20;
    left = 0; // x - vasakult poolt ekraani maa 
    top = 0; // y - korgus ekraanil

    color = 'white';

    velocityX = 4; // Initial velocity along X-axis
    velocityY = -4; // Initial velocity along Y-axis

    constructor(left, top, color) {
        this.left = left;
        this.top = top;
        this.color = color;
    }

    updatePosition() {
        this.left += this.velocityX;
        this.top += this.velocityY;
    }

    // Method to detect collisions with walls
    detectWallCollision(borderThickness) {
        if (this.left < borderThickness || (this.left + this.width) > 1000 - borderThickness) {
            this.velocityX = -this.velocityX; // Reverse X velocity on wall collision
        }
        if (this.top < borderThickness) {
            this.velocityY = -this.velocityY; // Reverse Y velocity on wall collision
        }
    }
}

export default class Brain {
    width = 1000;
    height = 1000;
    borderThickness = 30;

    // leftPaddle = new Paddle(50,200, 'green');
    paddle = new Paddle(400, 900, 'blue');

    ball = new Ball(500, 870, 'white');

    constructor() {
        console.log("Brain ctor");
    }

    startMovePaddle(paddle, step) {
        //console.log('Start Move Paddle Function')
        paddle.startMove(step, this.borderThickness);
    }

    stopMovePaddle(paddle) {
        paddle.stopMove(this.borderThickness);
    }

    /* shootBall(velocityX, velocityY) {
        this.ball.velocityX = velocityX;
        this.ball.velocityY = velocityY;
    } */

}
