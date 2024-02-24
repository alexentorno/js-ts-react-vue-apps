export class Paddle {
    width = 200;
    height = 50;
    left = 1110;
    top = 1110;

    color = 'blue';

    constructor(left, top, color) {
        this.left = left;
        this.top = top;
        this.color = color;
    }
}


export class Ball {

}

export default class Brain {
    width = 1000;
    height = 1000;
    borderThickness = 30;

    // leftPaddle = new Paddle(50,200, 'green');
    paddle = new Paddle(400, 900, 'blue');

    constructor() {
        console.log("Brain ctor");
    }

    movePaddle(paddle, step){
        console.log('Moving the paddle');
        paddle.left += step * 50;
    }
}
