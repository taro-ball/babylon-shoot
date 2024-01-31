// main.js
import GameLogic from './GameLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('renderCanvas');
    new GameLogic(canvas); // Initialize the game logic
});