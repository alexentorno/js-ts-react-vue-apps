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
        }

        if ((this.left + this.width) > 1000 - borderThickness) {
            this.left = (1000 - borderThickness) - (this.width);
            clearInterval(this.#intervalId);
            this.#intervalId = null;
        }

        console.log(this.left);
    }


    startMove(step, borderThickness) {
        if (this.#intervalId !== null) return;

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

    startMovePaddle(paddle, step) {
        paddle.startMove(step, this.borderThickness);
    }

    stopMovePaddle(paddle) {
        paddle.stopMove(this.borderThickness);
    }


}
