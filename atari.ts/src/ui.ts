import Ball from "./ball";
import Brain from "./brain";
import Brick from "./brick";
import Paddle from "./paddle";
import { AllowedColors } from "./utils";

export default class UI {
    // real screen dimensions
    width: number = -1;
    height: number = -1;


    private scaleX: number = 1;
    private scaleY: number = 1;

    public bricks: Brick[][] = [];

    constructor(private brain: Brain, private appContainer: HTMLDivElement) {
        this.setScreenDimensions();
        this.generateBricks();
    }

    setScreenDimensions(width?: number, height?: number) {
        this.width = width || document.documentElement.clientWidth;
        this.height = height || document.documentElement.clientHeight;

        this.scaleX = this.width / this.brain.width;
        this.scaleY = this.height / this.brain.height;
    }

    calculateScaledX(x: number): number {
        return x * this.scaleX | 0;
    }

    calculateScaledY(y: number): number {
        return y * this.scaleY | 0;
    }

    drawBorderSingle(left: number, top: number, width: number, height: number, color: AllowedColors): void {
        let border = document.createElement('div');

        border.style.zIndex = "10";
        border.style.position = 'fixed';

        border.style.left = left + 'px';
        border.style.top = top + 'px';

        border.style.width = width + 'px';
        border.style.height = height + 'px';
        border.style.backgroundColor = color;

        this.appContainer.append(border);
    }

    drawBorder(): void {
        // top border
        this.drawBorderSingle(0, 0, this.width, this.calculateScaledY(this.brain.borderThickness), 'gray');
        // left
        this.drawBorderSingle(0, 0, this.calculateScaledX(this.brain.borderThickness), this.height, 'gray');
        // right
        this.drawBorderSingle(this.width - this.calculateScaledX(this.brain.borderThickness), 0, this.calculateScaledX(this.brain.borderThickness), this.height, 'gray');
        //this.drawBorderSingle(0, 0, this.width, this.calculateScaledY(this.brain.borderThickness), 'gray');
    }

    drawPaddle(paddle: Paddle): void {
        let div = document.createElement('div');

        div.style.zIndex = "10";
        div.style.position = 'fixed';

        div.style.left = this.calculateScaledX(paddle.left) + 'px';
        div.style.top = this.calculateScaledY(paddle.top) + 'px';

        div.style.width = this.calculateScaledX(paddle.width) + 'px';
        div.style.height = this.calculateScaledY(paddle.height) + 'px';

        div.style.backgroundColor = paddle.color;

        this.appContainer.append(div);
    }

    drawBall(ball: Ball): void {
        let div = document.createElement('div');

        div.style.zIndex = "10";
        div.style.position = 'fixed';

        div.style.left = this.calculateScaledX(ball.left) + 'px';
        div.style.top = this.calculateScaledY(ball.top) + 'px';

        div.style.width = this.calculateScaledX(ball.width) + 'px';
        div.style.height = this.calculateScaledY(ball.height) + 'px';

        div.style.backgroundColor = ball.color;

        this.appContainer.append(div);
    }

    generateBricks(): void {
        console.log('generate bricks called');
        const numCols = 10; // Number of columns
        const numRows = 5;  // Number of rows
        const brickPadding = 5; // Padding between bricks

        //const horizontalPadding = availableWidth / 2;

        const rowColors: AllowedColors[] = ['red', 'orange', 'yellow', 'green', 'blue'];

        for (let row = 0; row < numRows; row++) {
            this.bricks[row] = [];
            for (let col = 0; col < numCols; col++) {
                const brickLeft: number = col * (Brick.width + brickPadding) + Brick.offsetLeft;
                const brickTop: number = row * (Brick.height + brickPadding) + Brick.offsetTop;
                const colorIndex: number = row % rowColors.length; // Determine color index based on row
                const color = rowColors[colorIndex]; // Get color for this row
                let newBrick: Brick = new Brick(brickLeft, brickTop, color);
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

    drawBricks(): void {
        this.bricks.forEach(row => {
            row.forEach(brick => {
                if (!brick.isDestroyed) {
                    let div = document.createElement('div');
                    div.style.zIndex = '10';
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

    drawBrickLives(brick: Brick, brickDiv: HTMLDivElement): void {
        // Create a div for the lives left
        let livesDiv = document.createElement('div');
        livesDiv.style.textAlign = 'center';
        livesDiv.style.position = 'absolute';
        livesDiv.style.width = '100%';
        livesDiv.style.height = '100%';
        livesDiv.style.color = 'white';
        livesDiv.textContent = brick.livesLeft.toString(); // Set text content to lives left
        brickDiv.appendChild(livesDiv); // Append lives div to brick container
    }

    drawTotalScore(totalScore: number): void {
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

    drawGameOver(): void {
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

    drawGameEndMenu(): void {
        // Create and append elements for the game end menu
        let gameEndMenuDiv = document.createElement('div');
        gameEndMenuDiv.textContent = 'Congratulations! You Won!';
        gameEndMenuDiv.style.position = 'fixed';
        gameEndMenuDiv.style.top = '50%';
        gameEndMenuDiv.style.left = '50%';
        gameEndMenuDiv.style.transform = 'translate(-50%, -50%)';
        gameEndMenuDiv.style.color = 'white';
        gameEndMenuDiv.style.fontSize = '24px';
        this.appContainer.appendChild(gameEndMenuDiv);
    }

    drawPauseMenu(): void {
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

    updateTextScaleAndPosition(htmlElement: HTMLElement): void {
        const scaledX = this.calculateScaledX(100) * 0.4; // Calculate scaled X position for button
        const scaledY = this.calculateScaledY(100) * 0.7; // Calculate scaled Y position for button

        htmlElement.style.left = `${scaledX}px`;
        htmlElement.style.bottom = `${scaledY * 0.8}px`;


        const fontSize = Math.min(scaledX, scaledY) * 0.4;
        htmlElement.style.fontSize = `${fontSize}px`;
    }

    drawPauseText(): void {
        let pauseButton = document.createElement('div');
        pauseButton.textContent = 'p - Pause on / off';
        pauseButton.id = 'pauseButton';
        pauseButton.style.position = 'fixed';
        pauseButton.style.transform = 'translateY(100%)';

        // Add event listener for window resize
        window.addEventListener('resize', () => this.updateTextScaleAndPosition(pauseButton));

        pauseButton.style.fontFamily = 'Arial, sans-serif';
        pauseButton.style.fontSize = '16px';
        pauseButton.style.padding = '7px 10px';

        pauseButton.style.color = '#ffffff';
        this.updateTextScaleAndPosition(pauseButton);

        this.appContainer.appendChild(pauseButton);
    }

    drawExitText(): void {
        let exitGame = document.createElement('div');
        exitGame.textContent = 'q - Quit Game';
        exitGame.id = 'quitText';
        exitGame.style.position = 'fixed';
        exitGame.style.bottom = '10px'; // Position at the bottom
        exitGame.style.left = '10px'; // Position at the right side

        // Add event listener for window resize
        window.addEventListener('resize', () => this.updateTextScaleAndPosition(exitGame));

        exitGame.style.fontFamily = 'Arial, sans-serif';
        exitGame.style.fontSize = '16px';
        exitGame.style.padding = '7px 10px';
        exitGame.style.color = '#ffffff';
        this.updateTextScaleAndPosition(exitGame);

        this.appContainer.appendChild(exitGame);
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

        this.drawPauseText();

        this.drawTotalScore(this.brain.totalScore);

        this.drawExitText();
    }
}