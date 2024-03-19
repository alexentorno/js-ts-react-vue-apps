import { Brick } from "./brick.js";

export default class UI {

    width = -1;
    height = -1;

    brain = null;
    appContainer = null;

    scaleX = 1;
    scaleY = 1;

    bricks = [];

    constructor(brain, appContainer) {
        this.brain = brain;
        this.appContainer = appContainer;
        this.setScreenDimensions();

        console.log(this);


        console.log(this.bricks)
    }

    setScreenDimensions(width, height) {
        this.width = width || document.documentElement.clientWidth;
        this.height = height || document.documentElement.clientHeight;

        this.scaleX = this.width / this.brain.width;
        this.scaleY = this.height / this.brain.height;

        this.generateBricks();
    }

    calculateScaledX(x) {
        return x * this.scaleX | 0;
    }

    calculateScaledY(y) {
        return y * this.scaleY | 0;
    }

    drawBorderSingle(left, top, width, height, color) {
        let div = document.createElement('div');

        div.style.zIndex = 10;
        div.style.position = 'fixed';

        div.style.left = left + 'px';
        div.style.bottom = top + 'px';

        div.style.width = width + 'px';
        div.style.height = height + 'px';
        div.style.backgroundColor = color;

        this.appContainer.append(div);

    }


    drawBorder() {
        // top border
        this.drawBorderSingle(0, this.height - this.calculateScaledY(this.brain.borderThickness), this.width, this.calculateScaledY(this.brain.borderThickness), 'gray');
        // left
        this.drawBorderSingle(0, 0, this.calculateScaledX(this.brain.borderThickness), this.height, 'gray');
        // right
        this.drawBorderSingle(this.width - this.calculateScaledX(this.brain.borderThickness), 0, this.calculateScaledX(this.brain.borderThickness), this.height, 'gray');
        //this.drawBorderSingle(0, 0, this.width, this.calculateScaledY(this.brain.borderThickness), 'gray');

    }

    drawPaddle(paddle) {
        let div = document.createElement('div');

        div.style.zIndex = 10;
        div.style.position = 'fixed';

        div.style.left = this.calculateScaledX(paddle.left) + 'px';
        div.style.top = this.calculateScaledY(paddle.top) + 'px';

        div.style.width = this.calculateScaledX(paddle.width) + 'px';
        div.style.height = this.calculateScaledY(paddle.height) + 'px';

        div.style.backgroundColor = paddle.color;

        this.appContainer.append(div);
    }

    drawBall(ball) {
        let div = document.createElement('div');

        div.style.zIndex = 10;
        div.style.position = 'fixed';

        div.style.left = this.calculateScaledX(ball.left) + 'px';
        div.style.top = this.calculateScaledY(ball.top) + 'px';

        div.style.width = this.calculateScaledX(ball.width) + 'px';
        div.style.height = this.calculateScaledY(ball.height) + 'px';

        div.style.backgroundColor = ball.color;

        this.appContainer.append(div);
    }

    generateBricks() {
        const numCols = 10; // Number of columns
        const numRows = 5;  // Number of rows
        const brickPadding = 10; // Padding between bricks

        // Calculate the available space between the left and right borders
        const availableWidth = this.width - numCols * Brick.width - (numCols - 1) * brickPadding;
        const horizontalPadding = availableWidth / 2;

        const rowColors = ['red', 'orange', 'yellow', 'green', 'blue']; // Define colors for each row

        for (let row = 0; row < numRows; row++) {
            this.bricks[row] = [];
            for (let col = 0; col < numCols; col++) {
                const brickLeft = col * (Brick.width + brickPadding) + Brick.offsetLeft;
                const brickTop = row * (Brick.height + brickPadding) + Brick.offsetTop;
                const colorIndex = row % rowColors.length; // Determine color index based on row
                const color = rowColors[colorIndex]; // Get color for this row
                this.bricks[row][col] = new Brick(brickLeft, brickTop, color);
            }
        }
    }

    drawBricks() {
        this.bricks.forEach(row => {
            row.forEach(brick => {
                if (!brick.isDestroyed) {
                    let div = document.createElement('div');
                    div.style.zIndex = 10;
                    div.style.position = 'fixed';
                    div.style.left = this.calculateScaledX(brick.left) + 'px';
                    div.style.top = this.calculateScaledY(brick.top) + Brick.offsetTop / 2 + 'px';
                    div.style.width = this.calculateScaledX(Brick.width) + 'px';
                    div.style.height = this.calculateScaledY(Brick.height) + 'px';
                    div.style.backgroundColor = brick.color;
                    this.appContainer.append(div);
                }
            });
        });
        //console.log('Bricks drawn')
    }

    draw() {
        // clear previous render
        this.appContainer.innerHTML = '';
        this.setScreenDimensions();

        this.drawBorder();
        // this.drawPaddle(this.brain.leftPaddle);
        this.drawPaddle(this.brain.paddle);
        this.drawBall(this.brain.ball);

        this.drawBricks();
    }

}