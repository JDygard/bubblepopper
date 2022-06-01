import React, { useState, useEffect } from 'react';
import { SocketContext, socket } from "./components/Context/socket";
import './App.css';
import GameCanvas from './components/BubbleGame/GameCanvas';
import GameMenu from './components/BubbleGame/GameMenu';
import GameOver from './components/BubbleGame/GameOver';


const App = () => {
  const [displayMenu, setDisplayMenu] = useState(true);
  const [displayCanvas, setDisplayCanvas] = useState(false);
  const [displayOver, setDisplayOver] = useState(false);

  const gameMenu = () => {
    setDisplayMenu(true);
    setDisplayCanvas(false);
    setDisplayOver(false);
  }

  const gameCanvas = () => {
    setDisplayMenu(false);
    setDisplayCanvas(true);
    setDisplayOver(false);
  }

  const gameOver = () => {
    setDisplayMenu(false);
    setDisplayCanvas(false);
    setDisplayOver(true);
  }

  const gameRestartHandler = () => {
    gameMenu();
  };

  const gameStartHandler = () => {
    gameCanvas();
  };

  const gameEndHandler = () => {
    gameOver();
  };

  useEffect(() => {
    socket.on("endgame", () => {
      gameOver();
    });
  }, []);

  return (
    <SocketContext.Provider value={socket} >
      <div className="header">
        {displayMenu && <GameMenu gameStart={gameStartHandler} />}
        {displayCanvas && <GameCanvas gameEnd={gameEndHandler} />}
        {displayOver && <GameOver gameRestart={gameRestartHandler} gameStart={gameStartHandler} />}
      </div>
    </SocketContext.Provider>
  );
};

export default App;
