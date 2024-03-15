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
        brain.ball.updatePosition();
        
        // Detect collisions with walls
        brain.ball.detectWallCollision(brain.borderThickness);

        if (brain.paddle.detectBallCollision(brain.ball)) {
            // Reverse ball's vertical velocity to simulate bounce
            brain.ball.velocityY = -brain.ball.velocityY;
        }
        
        // Draw UI
        ui.draw();
        
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
                // console.log('Moving left')
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

    /* document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'q': // Space key for shooting
                // Shoot the ball upward with initial velocity
                brain.shootBall(5, -5); // Adjust the velocity as needed
                break;
        }
    }); */
    
    // draw ui asf as possible 
    uiDrawRepeater(ui, brain);
}

// =============== ENTRY POINT ================
console.log("App startup...");
main();
