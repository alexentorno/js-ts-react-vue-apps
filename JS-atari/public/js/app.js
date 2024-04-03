import Brain from "./brain.js";
import UI from "./ui.js";
import StartMenu from "./startMenu.js"

// Define gameLoop in the outer scope
function gameLoop(ui, brain) {
    // Update ball position
    if (!brain.paused && brain.gameStarted) {
        brain.ball.updatePosition();
    }

    // Detect collisions with walls
    brain.ball.detectWallCollision(brain.borderThickness);

    // Detect collisions with bricks
    for (let row = 0; row < ui.bricks.length; row++) {
        for (let col = 0; col < ui.bricks[row].length; col++) {
            let brick = ui.bricks[row][col];
            if (!brick.isDestroyed && brick.hasTouched(brain.ball).collision) {
                brick.livesLeft--;
                if (brick.livesLeft == 0) {
                    brain.destroyBrick(brick);
                }

                if (brick.hasTouched(brain.ball).collisionDirection == 'topOrBottom') {
                    brain.ball.velocityY = -brain.ball.velocityY;
                } else if (brick.hasTouched(brain.ball).collisionDirection == 'side') {
                    brain.ball.velocityX = -brain.ball.velocityX;
                }
            }
        }
    }

    // Detect collisions with paddle
    if (brain.paddle.detectBallCollision(brain.ball)) {
        // Reverse ball's vertical velocity to simulate bounce
        brain.ball.velocityY = -brain.ball.velocityY;
    }

    // Draw UI
    ui.draw();

    let allBricksDestroyed = ui.bricks.every(row => row.every(brick => brick.isDestroyed));
    if (allBricksDestroyed) {
        brain.paused = true;
        let happyEndMenu = new HappyEndMenu();
        happyEndMenu.drawGameEndMenu();
        return;
    }

    if (brain.isGameOver()) {
        ui.drawGameOver(); // Display "Game Over" text
        return; // Exit game loop
    }

    //If game is on pause, the paddle stops moving imediately
    if (brain.paused) {
        brain.stopMovePaddle(brain.paddle);
    }


    // Repeat game loop 
    requestAnimationFrame(() => gameLoop(ui, brain));

}

function validateIndexHtml() {
    if (document.querySelectorAll("#app").length != 1) {
        throw Error("More or less than one div with id 'app' found!");
    }
    if (document.querySelectorAll("div").length != 1) {
        throw Error("More or less than one div found in index.html!");
    }
}

function uiDrawRepeater(ui, brain) {
    // Start game loop
    gameLoop(ui, brain);
}

function start() {

    let appDiv = document.querySelector("#app");
    let startMenu = new StartMenu(appDiv);
    startMenu.drawStartMenu();
    console.log('start menu drawn')

    // Add event listener to start the game when any key is pressed
    document.addEventListener('keydown', function startGame(e) {
        // Hide the start menu
        startMenu.hideStartMenu();
        // Remove the event listener to avoid starting multiple games
        document.removeEventListener('keydown', startGame);
        // Start the game
        main();
    });
}

function main() {
    //validateIndexHtml();
    let appDiv = document.querySelector("#app");
    let brain = new Brain();
    let ui = new UI(brain, appDiv);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'q') {
            // Freeze the game
            brain.paused = true;
            // Display dialog box
            const saveScore = confirm("Do you want to save your score before exiting?");
            if (saveScore) {
                // Save score to local storage
                const score = brain.totalScore;
                const highScore = localStorage.getItem('highScore') || 0;
                if (score > highScore) {
                    localStorage.setItem('highScore', score);
                }
            }
            // Exit the game
            window.location.reload();
            return;
        }

        if (!brain.paused) {
            switch (e.key) {
                case 'z': // Left
                    brain.startMovePaddle(brain.paddle, -1);
                    break;
                case 'x': // Right
                    brain.startMovePaddle(brain.paddle, 1);
                    break;
            }
        }

    });



    document.addEventListener('keyup', (e) => {

        switch (e.key) {
            case 'z': // Left
                brain.stopMovePaddle(brain.paddle);
                break;
            case 'x': // Right
                brain.stopMovePaddle(brain.paddle);
                break;
        }

    });

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && !brain.gameStarted) { // Check if space is pressed and game has not started
            brain.shootBall(3, -5); // Example velocity, adjust as needed
        }
    });

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'p':
                brain.togglePause();
                break;
        }
    });

    // draw ui as soon as possible 
    uiDrawRepeater(ui, brain);
}

// Entry point
console.log("App startup...");
validateIndexHtml();
start();

