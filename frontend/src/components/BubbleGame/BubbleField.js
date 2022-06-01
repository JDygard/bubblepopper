import { useState, useContext, React, useEffect } from 'react';
import Bubble from './Bubble';
import { SocketContext } from '../Context/socket';

const BubbleField = props => {
    const socket = useContext(SocketContext);
    
    const [bubbles, setBubbles] = useState([]);
    const addBubble = (data) => {
        setBubbles(bubbles => [...bubbles, data]);
    };
    
    useEffect(() => {
        socket.on("endgame", () => {
            setBubbles([]);
        })

        socket.on("bubble", (data) => {
            addBubble(data);
        });
    // eslint-disable-next-line
    }, []);

    const removeBubbleHandler = (data) => {
        setBubbles(bubbles => bubbles.filter(bubble => bubble.id !== data));
    };

    return bubbles.map( bubble => (
        <Bubble bubble={bubble} removeBubble={removeBubbleHandler} dimensions={props.dimensions} />
    ));
};

export default BubbleField;