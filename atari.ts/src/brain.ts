import Ball from "./ball.js";
import Brick from "./brick.js";
import Paddle from "./paddle.js";

export default class Brain {
    private _width = 1000;
    private _height = 1000;
    private _borderThickness = 30;

    private _totalScore = 0;

    public paused = false;

    // leftPaddle = new Paddle(50,200, 'green');
    paddle = new Paddle(400, 900, 'blue');

    ball = new Ball(500, 870, 'white');

    gameStarted = false; // Flag to track whether the game has started or not

    constructor() {
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public get borderThickness() {
        return this._borderThickness;
    }

    public get totalScore() {
        return this._totalScore;
    }

    shootBall(velocityX: number, velocityY: number) {
        if (!this.gameStarted) { // Check if the game has started
            this.ball.velocityX = velocityX;
            this.ball.velocityY = velocityY;
            this.gameStarted = true; // Set gameStarted flag to true
        }
    }

    destroyBrick(brick: Brick) {
        // Increment total score based on brick color
        switch (brick.color) {
            case 'blue':
                this._totalScore += 100;
                break;
            case 'green':
                this._totalScore += 200;
                break;
            case 'yellow':
                this._totalScore += 300;
                break;
            case 'orange':
                this._totalScore += 400;
                break;
            case 'red':
                this._totalScore += 500;
                break;
        }

        // Set brick as destroyed
        brick.isDestroyed = true;
    }

    startMovePaddle(paddle: Paddle, step: number) {
        //console.log('Start Move Paddle Function')
        paddle.startMove(step, this.borderThickness);
    }

    stopMovePaddle(paddle: Paddle) {
        paddle.stopMove(this.borderThickness);
    }

    isGameOver() {
        return this.ball.top > this.height; // Check if the ball has flown under the paddle
    }

    togglePause() {
        this.paused = !this.paused;
    }

}
