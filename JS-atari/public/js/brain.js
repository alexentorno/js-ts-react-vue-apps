import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";

export default class Brain {
    width = 1000;
    height = 1000;
    borderThickness = 30;

    totalScore = 0;

    paused = false;

    // leftPaddle = new Paddle(50,200, 'green');
    paddle = new Paddle(400, 900, 'blue');

    ball = new Ball(500, 870, 'white');

    gameStarted = false; // Flag to track whether the game has started or not

    constructor() {
        console.log("Brain ctor");
    }

    shootBall(velocityX, velocityY) {
        if (!this.gameStarted) { // Check if the game has started
            this.ball.velocityX = velocityX;
            this.ball.velocityY = velocityY;
            this.gameStarted = true; // Set gameStarted flag to true
        }
    }

    destroyBrick(brick) {
        // Increment total score based on brick color
        switch (brick.color) {
            case 'blue':
                this.totalScore += 100;
                break;
            case 'green':
                this.totalScore += 200;
                break;
            case 'yellow':
                this.totalScore += 300;
                break;
            case 'orange':
                this.totalScore += 400;
                break;
            case 'red':
                this.totalScore += 500;
                break;
        }

        // Set brick as destroyed
        brick.isDestroyed = true;
    }

    startMovePaddle(paddle, step) {
        //console.log('Start Move Paddle Function')
        paddle.startMove(step, this.borderThickness);
    }

    stopMovePaddle(paddle) {
        paddle.stopMove(this.borderThickness);
    }

    isGameOver() {
        return this.ball.top > this.height; // Check if the ball has flown under the paddle
    }

    togglePause() {
        this.paused = !this.paused;
    }
}
