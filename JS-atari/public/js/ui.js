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
        this.generateBricks();
    }

    setScreenDimensions(width, height) {
        this.width = width || document.documentElement.clientWidth;
        this.height = height || document.documentElement.clientHeight;

        this.scaleX = this.width / this.brain.width;
        this.scaleY = this.height / this.brain.height;
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
        console.log('generate bricks called');
        const numCols = 10; // Number of columns
        const numRows = 5;  // Number of rows
        const brickPadding = 5; // Padding between bricks

        // Calculate the available space between the left and right borders
        const availableWidth = this.width - numCols * Brick.width - (numCols - 1) * brickPadding;
        //const horizontalPadding = availableWidth / 2;

        const rowColors = ['red', 'orange', 'yellow', 'green', 'blue']; // Define colors for each row

        for (let row = 0; row < numRows; row++) {
            this.bricks[row] = [];
            for (let col = 0; col < numCols; col++) {
                const brickLeft = col * (Brick.width + brickPadding) + Brick.offsetLeft;
                const brickTop = row * (Brick.height + brickPadding) + Brick.offsetTop;
                const colorIndex = row % rowColors.length; // Determine color index based on row
                const color = rowColors[colorIndex]; // Get color for this row
                let newBrick = new Brick(brickLeft, brickTop, color);
                switch (newBrick.color) {
                    case 'blue':
                        newBrick.livesLeft = 1;
                        break;
                    case 'green':
                        newBrick.livesLeft = 2;
                        break;
                    case 'yellow':
                        newBrick.livesLeft = 3;
                        break;
                    case 'orange':
                        newBrick.livesLeft = 4;
                        break;
                    case 'red':
                        newBrick.livesLeft = 5;
                        break;
                }

                this.bricks[row][col] = newBrick;
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
                    div.style.top = this.calculateScaledY(brick.top) + 'px';
                    div.style.width = this.calculateScaledX(Brick.width) + 'px';
                    div.style.height = this.calculateScaledY(Brick.height) + 'px';
                    div.style.backgroundColor = brick.color;
                    this.appContainer.append(div);

                    this.drawBrickLives(brick, div);
                }
            });
        });
        //console.log('Bricks drawn')
    }

    drawBrickLives(brick, brickDiv) {
        // Create a div for the lives left
        let livesDiv = document.createElement('div');
        livesDiv.style.textAlign = 'center';
        livesDiv.style.position = 'absolute';
        livesDiv.style.width = '100%';
        livesDiv.style.height = '100%';
        livesDiv.style.color = 'white';
        livesDiv.textContent = brick.livesLeft; // Set text content to lives left
        brickDiv.appendChild(livesDiv); // Append lives div to brick container
    }

    drawTotalScore(totalScore) {
        let scoreDiv = document.createElement('div');
        scoreDiv.style.position = 'fixed';
        scoreDiv.style.fontFamily = 'Arial, sans-serif';
        scoreDiv.style.bottom = '10px';
        scoreDiv.style.left = '50%';
        scoreDiv.style.transform = 'translateX(-50%)';
        scoreDiv.style.color = 'white';

        const scaledX = this.calculateScaledX(100) * 0.4; // Calculate scaled X position for button
        const scaledY = this.calculateScaledY(100) * 0.7;
        const fontSize = Math.min(scaledX, scaledY) * 0.5;
        scoreDiv.style.fontSize = `${fontSize}px`;

        scoreDiv.textContent = 'Total Score: ' + totalScore;
        this.appContainer.appendChild(scoreDiv);
    }

    drawGameOver() {
        let gameOverDiv = document.createElement('div');
        gameOverDiv.style.position = 'fixed';
        gameOverDiv.style.top = '50%';
        gameOverDiv.style.left = '50%';
        gameOverDiv.style.transform = 'translate(-50%, -50%)';
        gameOverDiv.style.color = 'white';
        gameOverDiv.style.fontSize = '36px';
        gameOverDiv.textContent = 'Game Over';
        this.appContainer.appendChild(gameOverDiv);
    }

    drawPauseMenu() {
        let gamePauseDiv = document.createElement('div');
        gamePauseDiv.id = 'gamePauseDiv'; // Set id for the pause menu div
        gamePauseDiv.style.position = 'fixed';
        gamePauseDiv.style.top = '50%';
        gamePauseDiv.style.left = '50%';
        gamePauseDiv.style.transform = 'translate(-50%, -50%)';
        gamePauseDiv.style.color = 'white';
        gamePauseDiv.style.fontSize = '36px';
        gamePauseDiv.textContent = 'Game Paused';
        this.appContainer.appendChild(gamePauseDiv);
    }

    deletePauseMenu() {
        console.log('deleted pause menu')
        const gamePauseDiv = document.getElementById('gamePauseDiv');
        if (gamePauseDiv) {
            this.appContainer.removeChild(gamePauseDiv);
        }
    }

    updateTextScaleAndPosition(htmlElement) {
        const scaledX = this.calculateScaledX(100) * 0.4; // Calculate scaled X position for button
        const scaledY = this.calculateScaledY(100) * 0.7; // Calculate scaled Y position for button

        htmlElement.style.left = `${scaledX}px`;
        htmlElement.style.bottom = `${scaledY * 0.8}px`;


        const fontSize = Math.min(scaledX, scaledY) * 0.4;
        htmlElement.style.fontSize = `${fontSize}px`;
    }

    createPauseButton() {
        let pauseButton = document.createElement('div');
        pauseButton.textContent = 'p - Pause on / off';
        pauseButton.id = 'pauseButton';
        pauseButton.style.position = 'fixed';
        pauseButton.style.transform = 'translatey(100%)';

        // Add event listener for window resize
        window.addEventListener('resize', this.updateTextScaleAndPosition(pauseButton));

        pauseButton.style.fontFamily = 'Arial, sans-serif';
        pauseButton.style.fontSize = '16px';
        pauseButton.style.padding = '7px 10px';

        pauseButton.style.color = '#ffffff';
        this.updateTextScaleAndPosition(pauseButton);

        this.appContainer.appendChild(pauseButton);
    }

    draw() {
        // clear previous render
        this.appContainer.innerHTML = '';
        this.setScreenDimensions();
        this.drawBorder();
        this.drawPaddle(this.brain.paddle);
        this.drawBall(this.brain.ball);

        this.drawBricks();

        if (this.brain.paused) {
            this.drawPauseMenu();
        }

        this.createPauseButton();

        this.drawTotalScore(this.brain.totalScore);
    }

}