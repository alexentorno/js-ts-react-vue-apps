export default class StartMenu {
    constructor(appContainer) {
        this.appContainer = appContainer;
    }

    //MOVE
    drawStartMenu() {
        // Create and append elements for the start menu
        let startMenuDiv = document.createElement('div');
        startMenuDiv.style.position = 'fixed';
        startMenuDiv.style.top = '50%';
        startMenuDiv.style.left = '50%';
        startMenuDiv.style.transform = 'translate(-50%, -50%)';
        startMenuDiv.style.color = 'white';
        startMenuDiv.style.textAlign = 'center';
        startMenuDiv.style.fontFamily = 'cursive'; // Apply fancy font
        startMenuDiv.style.fontSize = '36px';

        // Text for the game name
        let gameName = document.createElement('div');
        gameName.textContent = 'Atari Breakout';
        gameName.style.marginBottom = '20px'; // Add some margin below the game name

        // Text to prompt the user to press any key to start
        let startText = document.createElement('div');
        startText.textContent = 'Press any key to start';
        startText.style.fontSize = '14px';
        startText.style.opacity = '1';

        let bestScoreText = document.createElement('div');
        bestScoreText.textContent = `Best Score: ${this.getBestScore()}`;
        bestScoreText.style.fontSize = '24px';
        bestScoreText.style.marginTop = '20px'; // Add margin above the best score text

        startMenuDiv.appendChild(gameName);
        startMenuDiv.appendChild(startText);
        startMenuDiv.appendChild(bestScoreText);

        this.appContainer.appendChild(startMenuDiv);


        function breathe(element) {
            let opacity = 1;
            let increment = -0.02; // Adjust this value to control the breathing speed

            // Define a recursive function to animate the opacity
            function animate() {
                opacity += increment; // Increment or decrement opacity
                if (opacity <= 0.2 || opacity >= 1) {
                    increment *= -1; // Reverse the increment if opacity reaches limits
                }
                element.style.opacity = opacity; // Apply opacity to the element
                requestAnimationFrame(animate); // Request next frame
            }

            animate(); // Start animation
        }

        breathe(startText); // Apply breathing animation to the start text
    }


    hideStartMenu() {
        // Remove the start menu from the screen
        this.appContainer.innerHTML = '';
    }

    getBestScore() {
        const bestScore = localStorage.getItem('highScore');
        return bestScore ? bestScore : 0;
    }
}