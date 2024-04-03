import Ball from "./ball";
import { AllowedColors } from "./utils";

export default class Brick {
    public static width: number = 89;
    public static height: number = 30;
    public static offsetTop: number = 40;
    public static offsetLeft: number = 35;

    public isDestroyed = false;

    public livesLeft: number = 0;

    constructor(private _left: number,
        private _top: number,
        private _color: AllowedColors) {
    }

    public get left() {
        return this._left;
    }

    public get top() {
        return this._top;
    }

    public get color() {
        return this._color;
    }

    hasTouched(ball: Ball) {
        // Calculate the sides of the brick and ball
        const brickLeft: number = this._left;
        const brickRight: number = this._left + Brick.width;
        const brickTop: number = this._top;
        const brickBottom: number = this._top + Brick.height;

        const ballLeft: number = ball.left;
        const ballRight: number = ball.left + ball.width;
        const ballTop: number = ball.top;
        const ballBottom: number = ball.top + ball.height;

        // Check for collision
        if (
            brickRight >= ballLeft &&
            brickLeft <= ballRight &&
            brickBottom >= ballTop &&
            brickTop <= ballBottom
        ) {
            // Collision detected
            // Calculate collision direction
            const ballCenterX: number = ballLeft + ball.width / 2;
            const ballCenterY: number = ballTop + ball.height / 2;
            const brickCenterX: number = this._left + Brick.width / 2;
            const brickCenterY: number = this._top + Brick.height / 2;

            const dx: number = ballCenterX - brickCenterX;
            const dy: number = ballCenterY - brickCenterY;
            const width: number = (ball.width + Brick.width) / 2;
            const height: number = (ball.height + Brick.height) / 2;

            if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
                // Collision occurred
                const wy: number = width * dy;
                const hx: number = height * dx;

                if (wy > hx) {
                    return { collision: true, collisionDirection: 'topOrBottom' };
                } else {
                    return { collision: true, collisionDirection: 'side' };
                }
            }
        }

        // No collision detected
        return { collision: false, collisionDirection: null };
    }

}