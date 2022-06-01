import { randomUUID } from 'crypto';
import { gameConfig } from '../index.js';

// Randomizer
const numGenFn = (number) => {
    return Math.ceil(Math.random() * number);
}

// Bubble Generator
function* bubbleGeneratorFn() {
    let scaling = 0;
    while (gameConfig.gameActive) {
        if (gameConfig.newGame) {
            scaling = 0;
            gameConfig.newGame = false;
        }
        let bubble = {
            "id": randomUUID(),
            "x": numGenFn(80), // Arguments for x & y here are used as percentages in frontend
            "y": numGenFn(80),
            "drift": numGenFn(180),
            "duration": 1000 * (gameConfig.difficulty) - numGenFn(scaling * 20),
            "delay": 1250 - numGenFn(Math.pow(scaling, 2) * gameConfig.difficulty),
        };
        scaling += 1; 
        yield bubble;
    }
}

export var bubbleGenerator = bubbleGeneratorFn();