export class Brick {
    static width = 85;
    static height = 25;
    static offsetTop = 30;
    static offsetLeft = 30;

    color = 'green';
    isDestroyed = false;

    constructor(left, top, color) {
        this.left = left;
        this.top = top;
        this.color = color;
    }

    hasTouched(ball) {
        // Calculate the sides of the brick and ball
        const brickLeft = this.left;
        const brickRight = this.left + Brick.width;
        const brickTop = this.top;
        const brickBottom = this.top + Brick.height;

        const ballLeft = ball.left;
        const ballRight = ball.left + ball.width;
        const ballTop = ball.top;
        const ballBottom = ball.top + ball.height;

        // Check for collision
        if (
            brickRight >= ballLeft &&
            brickLeft <= ballRight &&
            brickBottom >= ballTop &&
            brickTop <= ballBottom
        ) {
            // Collision detected
            return true;
        }

        // No collision detected
        return false;
    }
}