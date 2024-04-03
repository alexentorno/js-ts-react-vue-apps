import Ball from "./ball";
import { AllowedColors } from "./utils";

export default class Paddle {
    private _width: number = 150;
    private _height: number = 40;
    /* private _left: number = 0;
    private _top: number = 0; */


    private intervalId: number | undefined = undefined;

    constructor(private _left: number,
        private _top: number,
        private _color: AllowedColors = "blue") {
    }

    public get left() {
        return this._left;
    }

    public get top() {
        return this._top;
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public get color() {
        return this._color;
    }

    validateAndFixPosition(borderThickness: number): void {
        if (this._left < borderThickness) {
            this._left = borderThickness;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }

        if ((this._left + this._width) > 1000 - borderThickness) {
            this._left = (1000 - borderThickness) - (this._width);
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    startMove(step: number, borderThickness: number): void {
        if (this.intervalId !== undefined) return;

        this.intervalId = setInterval(() => {
            this._left += step * 9;
            this.validateAndFixPosition(borderThickness);

        }, 10);

    }

    stopMove(borderThickness: number): void {
        if (!this.intervalId) return;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
        this.validateAndFixPosition(borderThickness);
    }

    detectBallCollision(ball: Ball): boolean {
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
