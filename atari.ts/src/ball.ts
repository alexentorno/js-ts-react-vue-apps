import { AllowedColors } from "./utils";

export default class Ball {
    private _width: number = 20;
    private _height: number = 20;

    public velocityX: number = 0; // Initial velocity along X-axis
    public velocityY: number = 0; // Initial velocity along Y-axis

    constructor(private _left: number,
        private _top: number,
        private _color: AllowedColors = "white") {
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

    updatePosition() {
        this._left += this.velocityX;
        this._top += this.velocityY;
    }

    // Method to detect collisions with walls
    detectWallCollision(borderThickness: number): void {
        if (this._left < borderThickness || (this._left + this._width) > 1000 - borderThickness) {
            this.velocityX = -this.velocityX; // Reverse X velocity on wall collision
        }
        if (this._top < borderThickness) {
            this.velocityY = -this.velocityY; // Reverse Y velocity on wall collision
        }
    }


}