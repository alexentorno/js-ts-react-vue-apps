import Brain from "./brain";
import StartMenu from "./startMenu";
import UI from "./ui";
// Define gameLoop in the outer scope
function gameLoop(ui: UI, brain: Brain) {
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
        ui.drawGameEndMenu();
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

function uiDrawRepeater(ui: UI, brain: Brain) {
    gameLoop(ui, brain);
}

function start() {

    let appDiv = document.querySelector("#app");
    if (!appDiv) {
        console.error('App div not found.');
        return;
    }
    if (!(appDiv instanceof HTMLDivElement)) {
        console.error('App div is not a HTMLDivElement.');
        return;
    }
    let startMenu = new StartMenu(appDiv);

    startMenu.drawStartMenu();

    // Add event listener to start the game when any key is pressed
    document.addEventListener('keydown', function startGame() {
        startMenu.hideStartMenu();
        document.removeEventListener('keydown', startGame);
        main();
    });
}

function main() {
    //validateIndexHtml();
    let appDiv = document.querySelector("#app");
    if (!appDiv) {
        console.error('App div not found.');
        return;
    }
    if (!(appDiv instanceof HTMLDivElement)) {
        console.error('App div is not a HTMLDivElement.');
        return;
    }
    let brain = new Brain();
    let ui = new UI(brain, appDiv);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'q') {
            brain.paused = true;
            const saveScore = confirm("Do you want to save your score before exiting?");
            if (saveScore) {
                // Save score to local storage
                const score = brain.totalScore;
                const highScore: number = Number(localStorage.getItem('highScore')) || 0;
                if (score > highScore) {
                    localStorage.setItem('highScore', score.toString());
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
        if (e.key === ' ' && !brain.gameStarted) {
            brain.shootBall(3, -11);
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
