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

function uiDrawRepeater(ui){
    setTimeout(() => {
        ui.draw();
        uiDrawRepeater(ui);
    }, 0);
}

function main() {
    validateIndexHtml();
    let appDiv = document.querySelector("#app");
    let brain = new Brain();
    let ui = new UI(brain, appDiv);
    /*
    ui.draw();

    const func = (e) => {
        ui.draw();
    }

    window.addEventListener('resize', func);
    */

    
    

    document.addEventListener('keydown', (e) => {
        // console.log('down', e);
        switch (e.key) {
            case 'z': // Left
                brain.startMovePaddle(brain.paddle, -1);
                break;
            case 'x': // Right
                brain.startMovePaddle(brain.paddle, 1);
                break; 
        }
    });
    document.addEventListener('keyup', (e) => {
        // console.log('up', e);
        switch (e.key) {
            case 'z': // Left
                brain.stopMovePaddle(brain.paddle, -1);
                break;
            case 'x': // Right
                brain.stopMovePaddle(brain.paddle, 1);
                break; 
        }
    });

    document.addEventListener('keypress', (e) => {
        console.log('press', e)
        switch (e.key) {
            case 'z': // Left
                brain.startMovePaddle(brain.paddle, -1);
                break;
            case 'x': // Right
                brain.startMovePaddle(brain.paddle, 1);
                break;
        }
        ui.draw();
    });
    // draw ui asf as possible 
    uiDrawRepeater(ui);
}

// =============== ENTRY POINT ================
console.log("App startup...");
main();
