import Brain from "./brain";
import UI from "./ui";

function validateIndexHtml() {
    if (document.querySelectorAll("#app").length != 1) {
        throw Error("More or less than one div with id 'app' found!");
    }
    if (document.querySelectorAll("div").length != 1) {
        throw Error("More or less than one div found in index.html!");
    }
}

function uiDrawRepeater(ui: UI){
    setTimeout(() => {
        ui.draw(); 
        uiDrawRepeater(ui);
    }, 0);
}

function main() {
    validateIndexHtml();
    let appDiv = document.querySelector<HTMLDivElement>("#app")!;
    let brain = new Brain();
    let ui = new UI(brain, appDiv);

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
                brain.stopMovePaddle(brain.paddle);
                break;
            case 'x': // Right
                brain.stopMovePaddle(brain.paddle);
                break; 
        }
    });

    // draw ui as fast as possible - on repeat
    uiDrawRepeater(ui);
}


// https://stackoverflow.com/questions/64752006/calculate-a-position-based-on-an-angle-a-speed-and-a-starting-position

// =============== ENTRY POINT ================
console.log("App startup...");
main();