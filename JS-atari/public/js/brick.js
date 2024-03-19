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
}