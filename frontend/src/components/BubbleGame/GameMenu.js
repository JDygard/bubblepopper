import { React, useState, useContext } from 'react';
import { SocketContext } from '../Context/socket'
import Button from '../UI/Button';

const GameMenu = (props) => {
    const [difficulty, setDifficulty] = useState(1);
    const [difficultyButton, setDifficultyButton] = useState(true);
    const [difficultyButtonText, setDifficultyButtonText] = useState("Single");
    const socket = useContext(SocketContext);

    const gameStartClickHandler = (event) => {
        props.gameStart();
    }

    const updateDifficulty = (event) => {
        let id = event.target.id;

        if (id == 1) {
            setDifficultyButtonText("Single")
        } else if (id == 2) {
            setDifficultyButtonText("Double")
        } else if (id == 3) {
            setDifficultyButtonText("Triple")
        };

        setDifficultyButton(true);
        socket.emit("difficulty", id);
    }

    const difficultyOptions = () => {
        setDifficultyButton(false);
    }

    return (
        <div className="header">
            <h2> Double Bubble </h2>
            <Button clickMe={gameStartClickHandler}> Start </Button>
            {difficultyButton && <Button clickMe={difficultyOptions}> {difficultyButtonText} </Button>}
            {!difficultyButton &&
                <div>
                    <Button clickMe={updateDifficulty} id="1">Single</Button>
                    <Button clickMe={updateDifficulty} id="2">Double</Button>
                    <Button clickMe={updateDifficulty} id="3">Triple</Button>
                </div>
            }
        </div>
    )
}

export default GameMenu;