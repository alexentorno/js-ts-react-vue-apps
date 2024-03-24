export default class StartMenu {
    constructor(appContainer) {
        this.appContainer = appContainer;
    }

    drawStartMenu() {
        // Create and append elements for the start menu
        // You can customize the start menu UI as needed
        let startMenuDiv = document.createElement('div');
        startMenuDiv.textContent = 'Press any key to start';
        startMenuDiv.style.position = 'fixed';
        startMenuDiv.style.top = '50%';
        startMenuDiv.style.left = '50%';
        startMenuDiv.style.transform = 'translate(-50%, -50%)';
        startMenuDiv.style.color = 'white';
        startMenuDiv.style.fontSize = '24px';
        this.appContainer.appendChild(startMenuDiv);
    }

    hideStartMenu() {
        // Remove the start menu from the screen
        this.appContainer.innerHTML = '';
    }
}