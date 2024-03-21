export class Paddle {
    width = 150;
    height = 40;
    left = 0; // x - vasakult poolt ekraani maa 
    top = 0; // y - korgus ekraanil

    color = 'blue';

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
        if (this.#intervalId !== null) {
            //console.log(this.#intervalId)
            //console.log(this.top)
            return;
        }

        this.#intervalId = setInterval(() => {
            this.left += step * 9;
            // 0 - border
            this.validateAndFixPosition(borderThickness);

        }, 10);

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