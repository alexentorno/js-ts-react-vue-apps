import Brain from "./brain.js";
import UI from "./ui.js";

function validateIndexHtml() {
    if (document.querySelectorAll("#app").length != 1) {
        throw Error("More or less than one div with id 'app' found!");
    }
    if (document.querySelectorAll("div").length != 1) {
        throw Error("More or less than one div found in index.html!");
    }
}

function uiDrawRepeater(ui, brain) {
    function gameLoop() {
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

        if (brain.isGameOver()) {
            ui.drawGameOver(); // Display "Game Over" text
            return; // Exit game loop
        }


        // Repeat game loop
        requestAnimationFrame(gameLoop);
    }

    // Start game loop
    gameLoop();
}

function main() {
    validateIndexHtml();
    let appDiv = document.querySelector("#app");
    let brain = new Brain();
    let ui = new UI(brain, appDiv);


    document.addEventListener('keydown', (e) => {
        // console.log('down', e);
        switch (e.key) {
            case 'z': // Left
                brain.startMovePaddle(brain.paddle, -1);
                //console.log('Moving left')
                break;
            case 'x': // Right
                brain.startMovePaddle(brain.paddle, 1);
                // console.log('Moving right')
                break;

        }
    });
    document.addEventListener('keyup', (e) => {
        // console.log('up', e);
        switch (e.key) {
            case 'z': // Left
                brain.stopMovePaddle(brain.paddle, -1);
                //console.log('STOP LEFT')
                break;
            case 'x': // Right
                brain.stopMovePaddle(brain.paddle, 1);
                //console.log('STOP RIGHT')
                break;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && !brain.gameStarted) { // Check if space is pressed and game has not started
            brain.shootBall(3, -5); // Example velocity, adjust as needed
        }
    });

    // draw ui asf as possible 
    uiDrawRepeater(ui, brain);
}

// =============== ENTRY POINT ================
console.log("App startup...");
main();
