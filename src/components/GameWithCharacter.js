import PlayerControl from './PlayerControl';
import UserInterface from './ui/UserInterface';
import { createRef } from 'react';
import { createScene } from '../engine';
const GameWithCharacter = () => {
    let gameContainer = createRef();
    const speed = 1;
    const turnSpeed = 1;
    const scene = createScene();
    const start = async () => {
        while(!gameContainer.current){
            await new Promise(resolve => setTimeout(resolve), 5);
        }
        scene.setup(gameContainer.current);
    }
    start();
    const downPressed = () => {
        scene.getPlayerControllers().forEach(item => item.move(speed));
    };
    const downReleased = () => {
        scene.getPlayerControllers().forEach(item => item.moveStop());
    }
    const upPressed = async () => {
        scene.getPlayerControllers().forEach(item => item.move(speed * -1));
    };
    const upReleased = () => {
        scene.getPlayerControllers().forEach(item => item.moveStop());
    }
    const leftPressed = () => {
        scene.getPlayerControllers().forEach(item => item.directionChange(turnSpeed * -1));
    };
    const rightPressed = () => {
        scene.getPlayerControllers().forEach(item => item.directionChange(turnSpeed));
    };
    const spacePressed = () => {
        scene.getPlayerControllers().forEach(item => item.space());
    };
    const pointerStarted = (e) => {
        if(e.mobile){
            scene.getPlayerControllers().forEach(item => item.move(speed * -1));
        }
        else{
            scene.getPlayerControllers().forEach(item => item.povStart(e));
        }
    }
    const pointerChanged = (e) => {
        if(e.mobile){
            scene.getPlayerControllers().forEach(item => item.directionChange(e.direction));
        }
        else{
            scene.getPlayerControllers().forEach(item => item.povChange(e.position));
        }
        
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
            >
                <UserInterface scene={scene} />
            </PlayerControl>
        </div>
    );
}

export default GameWithCharacter;
