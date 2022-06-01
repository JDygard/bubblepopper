import { React, useState, useEffect, useContext } from 'react';
import { SocketContext } from '../Context/socket';
import Button from '../UI/Button';

const GameOver = (props) => {
    const [score, setScore] = useState({});;
    const socket = useContext(SocketContext);
    
    useEffect(() => {
        socket.emit("finalscore");
        socket.on("finalscore", (data) => {
            setScore(data);
        });
    }, []);

    const gameStartClickHandler = () => {
        props.gameStart();
    };

    const gameRestartClickHandler = () => {
        props.gameRestart();
    };

    return (
        <div className='header'>
            <h2>
                You've lost
            </h2>
            <h3>Score: {score.score}     Time survived: {score.time}</h3>
            <Button clickMe={gameStartClickHandler}>Play again</Button>
            <Button clickMe={gameRestartClickHandler}>Back to menu</Button>
        </div>
    );
};

export default GameOver;