import { useState } from 'react';
import './SteeringWheel.css';
const SteeringWheel = ({onSpeedChange, onDirectionChange}) => {
    
    const [steeringX, setSetSteeringX] = useState(50);
    const [steeringY, setSetSteeringY] = useState(50);
    const [dragging, setDragging] = useState(false);
    const onDown = () => {
        setDragging(true);
        if(onSpeedChange){
            onSpeedChange(1);
        }
        
    }
    const onMove = e => {
        if(dragging){
            const xPos = e.touches[0].pageX;
            setSetSteeringX((xPos / window.innerWidth) * 100);
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