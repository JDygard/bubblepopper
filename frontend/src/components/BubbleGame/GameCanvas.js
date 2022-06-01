import { useState, useEffect, useRef, useContext, React } from 'react';
import { SocketContext } from '../Context/socket';
import BubbleField from './BubbleField';
import Counter from '../UI/Counter';
import "./GameCanvas.css";

const GameCanvas = props => {
    const [countdown, setCountdown] = useState(3);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [refX, setRefX] = useState(0);
    const [refY, setRefY] = useState(0);

    const socket = useContext(SocketContext);

    var gameStart = () => {
        socket.emit("game", "game start");
    }

    useEffect(() => {
        socket.on("endgame", () => {
            setScore(0);
            setTime();
        });
        socket.on("score", (data) => {
            setScore(data);
        });
        socket.on("time", (data) => {
            setTime(data);
        });
        setRefX(ref.current.clientWidth);
        setRefY(ref.current.clientHeight);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000)
        if (countdown === 0) {
            setCountdown(countdown - 1);
            gameStart();
        }
    }, [countdown]);

    const ref = useRef(null);

    return (
        <div ref={ref} id="game-canvas">
            <div style={{ position: "fixed", left: refX / 2, top: refY / 2 }}>
                {countdown >= 1 && <Counter value={countdown} />}
            </div>
            <div className='scorecard'>
                <h2>Time: <Counter value={time} /></h2>
                <h2>Score: <Counter value={score} /></h2>
            </div>
            <BubbleField dimensions={[refX, refY]} />
        </div>
    );
};

export default GameCanvas;