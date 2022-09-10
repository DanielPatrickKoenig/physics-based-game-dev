import { useState } from 'react'; 
const UserInterface = ({scene}) => {
    const [ pMarkerX, setPMarkerX ] = useState(0);
    const [ pMarkerY, setPMarkerY ] = useState(0);
    const [ pMarkerZ, setPMarkerZ ] = useState(0);
    const processAction = (data, type) => {
        setPMarkerX(data.position.x);
        setPMarkerY(data.position.y);
        setPMarkerZ(data.position.z);
        // handle actions here
    }
    const markerClicked = () => {
        scene.hitPinata();
    }
    scene.setActionHandler(processAction);
    return (
        <div>
            <div className="overlayer" style={{position: 'absolute',top: '0',width: '1000px',height: '700px'}}>
                <div style={{position: 'absolute', left: '50%', top: '50%'}}>
                    <div onClick={markerClicked} style={{zIndex: 200, position: 'absolute', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', border: '1px solid #cccccc', left: `${pMarkerX * -25}px`, top: `${(pMarkerY * -30) + 180}px`}}></div>
                </div>
            </div>
                

            <button>Test Button</button>
            <p>{pMarkerX}</p>
            <p>{pMarkerY}</p>
            <p>{pMarkerZ}</p>
        </div>
    );
}
export default UserInterface;