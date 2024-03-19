export class Ball {
    width = 20;
    height = 20;
    left = 0; // x - vasakult poolt ekraani maa 
    top = 0; // y - korgus ekraanil

    color = 'white';

    velocityX = 4; // Initial velocity along X-axis
    velocityY = -4; // Initial velocity along Y-axis

    constructor(left, top, color) {
        this.left = left;
        this.top = top;
        this.color = color;
    }

    updatePosition() {
        this.left += this.velocityX;
        this.top += this.velocityY;
    }

    // Method to detect collisions with walls
    detectWallCollision(borderThickness) {
        if (this.left < borderThickness || (this.left + this.width) > 1000 - borderThickness) {
            this.velocityX = -this.velocityX; // Reverse X velocity on wall collision
        }
        if (this.top < borderThickness) {
            this.velocityY = -this.velocityY; // Reverse Y velocity on wall collision
        }
    }
}