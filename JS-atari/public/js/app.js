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

function main() {
    validateIndexHtml();
    let appDiv = document.querySelector("#app");
    let brain = new Brain();
    let ui = new UI(brain, appDiv);

    ui.draw();

    window.addEventListener('resize', (e) => {
        ui.draw();
    });

    document.addEventListener('keydown', (e) => {
        console.log('down', e);
    });
    document.addEventListener('keyup', (e) => {
        console.log('up', e);
    });

    document.addEventListener('keypress', (e) => {
        console.log('press', e)
        switch (e.key) {
            case 'z': // Left
                brain.movePaddle(brain.paddle, -1);
                break;
            case 'x': // Right
                brain.movePaddle(brain.paddle, 1);
                break;
        }
        ui.draw();
    });
}

// =============== ENTRY POINT ================
console.log("App startup...");
main();
