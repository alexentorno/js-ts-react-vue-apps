import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";



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
