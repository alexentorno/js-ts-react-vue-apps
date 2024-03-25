export default class HappyEndMenu {
    drawGameEndMenu() {
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

    hideGameEndMenu() {
        // Remove the game end menu from the screen
        let gameEndMenuDiv = this.appContainer.querySelector('.game-end-menu');
        if (gameEndMenuDiv) {
            this.appContainer.removeChild(gameEndMenuDiv);
        }
    }
}