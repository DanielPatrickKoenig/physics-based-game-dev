import ExampleSceneWithCharacter from '../classes/ExampleSceneWithCharacter';

import { createRef } from 'react';
import PlayerControl from './PlayerControl';
const Game = () => {
    let gameContainer = createRef();
    
    const createScene = async () => {
        while(!gameContainer.current){
            await new Promise(resolve => setTimeout(resolve), 5);
        }
        return new ExampleSceneWithCharacter(gameContainer.current);
    }
    const scene = createScene();
    return (
        <div>
            <div ref={gameContainer} className="game-container"></div>
            <PlayerControl />
        </div>
    );
}

export default Game;
