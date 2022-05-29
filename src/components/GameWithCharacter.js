import PlayerControl from './PlayerControl';
import { createRef } from 'react';
import { createScene } from '../engine';
const GameWithCharacter = () => {
    let gameContainer = createRef();
    const speed = 1;
    const turnSpeed = 1;
    let scene = null;
    const start = async () => {
        while(!gameContainer.current){
            await new Promise(resolve => setTimeout(resolve), 5);
        }
        scene = createScene(gameContainer.current);
    }
    start();
    const downPressed = () => {
        scene.getPlayerControllers().forEach(item => item.move(speed));
        console.log('pressed down');
    };
    const downReleased = () => {
        scene.getPlayerControllers().forEach(item => item.moveStop());
    }
    const upPressed = async () => {
        console.log(scene);
        scene.getPlayerControllers().forEach(item => item.move(speed * -1));
        console.log('pressed up');
    };
    const upReleased = () => {
        scene.getPlayerControllers().forEach(item => item.moveStop());
    }
    const leftPressed = () => {
        scene.getPlayerControllers().forEach(item => item.directionChange(turnSpeed * -1));
        console.log('pressed left');
    };
    const rightPressed = () => {
        scene.getPlayerControllers().forEach(item => item.directionChange(turnSpeed));
        console.log('pressed right');
    };
    const spacePressed = () => {
        console.log('pressed space');
        scene.getPlayerControllers().forEach(item => item.space());
    };
    const pointerStarted = (e) => {
        if(e.mobile){
            scene.getPlayerControllers().forEach(item => item.move(speed * -1));
        }
    }
    const pointerChanged = (e) => {
        console.log('pointer changed');
        console.log(e);
        scene.getPlayerControllers().forEach(item => item.directionChange(e.direction));
    }
    const pointerStopped = (e) => {
        if(e.mobile){
            scene.getPlayerControllers().forEach(item => item.moveStop());
        }
        
    }
    return (
        <div>
            <div ref={gameContainer} className="game-container"></div>
            <PlayerControl 
                onPressDown={downPressed}
                onPressUp={upPressed}
                onPressLeft={leftPressed}
                onPressRight={rightPressed}
                onPressSpace={spacePressed}
                onReleaseDown={downReleased}
                onReleaseUp={upReleased}
                onPointerStart={pointerStarted}
                onPointerChange={pointerChanged}
                onPointerStop={pointerStopped}
            />
        </div>
    );
}

export default GameWithCharacter;
