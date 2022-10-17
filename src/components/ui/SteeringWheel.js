import { useState } from 'react';
import './SteeringWheel.css';
const SteeringWheel = ({onSpeedChange, onDirectionChange}) => {
    
    const [steeringX, setSetSteeringX] = useState(50);
    const [steeringY, setSetSteeringY] = useState(50);
    const [dragging, setDragging] = useState(false);
    let easeSignature = 0.0;
    const onDown = () => {
        easeSignature = Math.random();;
        setDragging(true);
        if(onSpeedChange){
            onSpeedChange(1);
        }
        
    }
    const onMove = e => {
        if(dragging){
            const xPos = e.touches[0].pageX;
            let calcPos = (xPos / window.innerWidth) * 100;
            if(calcPos > 100) calcPos = 100;
            if(calcPos < 0) calcPos = 0;
            setSetSteeringX(calcPos);
            if(onDirectionChange){
                onDirectionChange((steeringX - 50) / 100);
            }
        }
    }
    const onUp = () => {
        if(dragging){
            setDragging(true);
            if(onSpeedChange){
                onSpeedChange(0);
            }
            // easeWheelToCenter();
        }
    }
    
    return <div>
        <svg className="steering-wheel">
            <g>
                <circle
                    className="steering-wheel-dragger"
                    cx={`${steeringX}%`}
                    cy={`${steeringY}%`}
                    r="50"
                    fill="#cc0000"
                    onTouchStart={onDown}
                    onTouchMove={onMove}
                    onTouchEnd={onUp}
                />
            </g>
        </svg>
    </div>
}

export default SteeringWheel;