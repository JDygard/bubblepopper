import React, { useContext } from 'react';
import { SocketContext } from '../Context/socket';

const Bubble = props => {
    const socket = useContext(SocketContext);
    const bubble = props.bubble;

    
    const positionFn = (clientDimension, bubbleAreaDimension) => {
        // Uses the random percentile data from the backend and puts it in the middle 80% of the client viewport resolution
        let result = bubbleAreaDimension / 80 * ((clientDimension * 0.8) + clientDimension * 0.1);
        return result;
    }
    var yPos = positionFn(props.dimensions[1], bubble.y);
    var xPos = positionFn(props.dimensions[0], bubble.x);
    
    const bubbleBurst = () => {
        socket.emit("bubble", bubble.id);
        props.removeBubble(bubble.id);
    }

    return (
        <div onClick={bubbleBurst} className="bubble" style={{ left: xPos, top: yPos }}>
            ○
        </div>
    )
};

export default Bubble;