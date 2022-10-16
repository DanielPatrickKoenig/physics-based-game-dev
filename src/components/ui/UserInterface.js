import { useState } from 'react'; 
import SteeringWheel from './SteeringWheel';
import './UserInterface.css';
const UserInterface = ({scene, gameIndex}) => {
    const [ pMarkerX, setPMarkerX ] = useState(0);
    const [ pMarkerY, setPMarkerY ] = useState(0);
    const [ pMarkerZ, setPMarkerZ ] = useState(0);
    const processAction = (data, type) => {
        setPMarkerX(data.percent.x);
        setPMarkerY(data.percent.y);
        // handle actions here
    }
    const markerClicked = () => {
        scene.hitPinata();
    }

    const directionChange = d => {
        scene.carController.turn(d);
        
    }
    const speedChange = s => {
        scene.carController.move(s * 10);
    }

    scene.setActionHandler(processAction);
        const pinataUI = <div>
            <div className="overlayer">
                <div>
                    <div onClick={markerClicked} style={{left: `${pMarkerX}%`, top: `${pMarkerY}%`}}>
                        <p>Tap this box to hit the pinata</p>
                    </div>
                </div>
            </div>
            <p>{pMarkerX}</p>
            <p>{pMarkerY}</p>
            <p>{pMarkerZ}</p>
        </div>;

        const carUI = <div>
            <SteeringWheel 
                onDirectionChange={directionChange}
                onSpeedChange={speedChange}
            />
        </div>;

        return (
        <div>
            {gameIndex === 0 ? pinataUI : carUI}
        </div>
    );
}
export default UserInterface;