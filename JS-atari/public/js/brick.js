export class Brick {
    static width = 89;
    static height = 30;
    static offsetTop = 40;
    static offsetLeft = 35;

    color = 'green';
    isDestroyed = false;

    livesLeft = 0;

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
            // Calculate collision direction
            const ballCenterX = ballLeft + ball.width / 2;
            const ballCenterY = ballTop + ball.height / 2;
            const brickCenterX = this.left + Brick.width / 2;
            const brickCenterY = this.top + Brick.height / 2;

            const dx = ballCenterX - brickCenterX;
            const dy = ballCenterY - brickCenterY;
            const width = (ball.width + Brick.width) / 2;
            const height = (ball.height + Brick.height) / 2;

            if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
                // Collision occurred
                const wy = width * dy;
                const hx = height * dx;

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