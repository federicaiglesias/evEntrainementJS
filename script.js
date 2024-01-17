document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const newGameButton = document.getElementById('new-game');
    const rollDiceButton = document.getElementById('roll-dice');
    const holdButton = document.getElementById('hold');
    const round1Element = document.getElementById('round1');
    const round2Element = document.getElementById('round2');
    const score1Element = document.getElementById('score1');
    const score2Element = document.getElementById('score2');
    const diceElement = document.getElementById('dice');

    const WINNING_SCORE = 100;
    const NUM_DICE_SIDES = 6; 

    let currentPlayer = 1;
    let currentRoundScore = 0;
    let globalScores = [0, 0];
    let isGamePlaying = false;

    // Event Listeners
    newGameButton.addEventListener('click', startNewGame);
    rollDiceButton.addEventListener('click', rollDice);
    holdButton.addEventListener('click', hold);

    // Functions
    function startNewGame() {
        globalScores = [0, 0];
        currentPlayer = 1;
        currentRoundScore = 0;
        isGamePlaying = true;

        round1Element.textContent = '0';
        round2Element.textContent = '0';
        score1Element.textContent = '0';
        score2Element.textContent = '0';

       alert("Nouvelle partie commencée. C'est au tour du Joueur 1.");
    }
    function rollDiceAnimation(diceValue) {
        // Clear last dots
        diceElement.innerHTML = '';
        // Create dots for each dice value
        for (let i = 0; i < diceValue; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            diceElement.appendChild(dot);
        }
        // Set dice text content
        diceElement.textContent = diceValue;
        // Dice rotation animation
        diceElement.style.animation = 'diceRoll 1.5s ease-out';
        setTimeout(() => {
            diceElement.style.animation = '';
        }, 1500);
    }
    function rollDice() {
        setTimeout(() => {
            if (isGamePlaying) {
                const diceValue = Math.floor(Math.random() * NUM_DICE_SIDES) + 1;
                rollDiceAnimation(diceValue);
    
                if (diceValue === 1) {
                    alert(`Le Joueur ${currentPlayer} a obtenu un 1. Le score ROUND est perdu, et c'est la fin de son tour.`);
                    switchPlayer();
                } else {
                    currentRoundScore += diceValue;
                    alert(`Score ROUND actuel du Joueur ${currentPlayer} : ${currentRoundScore}`);
                    document.getElementById(`round${currentPlayer}`).textContent = currentRoundScore;
                }
            }
        }, 1500); 
    }
    function hold() {
         if (isGamePlaying) {
            const currentPlayerScoreElement = (currentPlayer === 1) ? score1Element : score2Element;
        
            globalScores[currentPlayer - 1] += currentRoundScore;
            currentPlayerScoreElement.textContent = globalScores[currentPlayer - 1];
        
            if (globalScores[currentPlayer - 1] >= WINNING_SCORE) {
                endGame(currentPlayer);
            } else {
                alert(`Le Joueur ${currentPlayer} a retenu son score ROUND. C'est au tour de l'autre joueur.`);
                switchPlayer();
                }
            }
        }  
    function switchPlayer() {
        currentRoundScore = 0;
        document.getElementById(`round${currentPlayer}`).textContent = '0';
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        alert(`C'est au tour du Joueur ${currentPlayer}.`);
    }
        
    function endGame(winner) {
        alert(`Le Joueur ${winner} a gagné !`);
        isGamePlaying = false;
    }
});
