import { useState } from 'react'; 
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

    scene.setActionHandler(processAction);
        const pinataButton = <div>
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

        return (
        <div>
            {gameIndex === 0 ? pinataButton : <div></div>}
        </div>
    );
}
export default UserInterface;