import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import { bubbleGenerator } from "./logic/generator.js"
const app = express();

app.use(express.static('frontend/build/'));

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4003", "http://localhost:4000"],
  }
});

export var gameConfig = {
  newGame: true, // Used by the generator function to reset itself
  gameActive: false, // Used to shut off the game logic at conclusion
  difficulty: 1, // 1, 2 or 3. Determines how many bubble threads are started
};

var finalScore = {};
var activeBubbles = [];
var time = 0;
var score = 0;

// ----------------------------------------------------------- BUBBLE GENERATOR
const bubbleTimer = () => {
  // Generate a bubble
  let bubble = bubbleGenerator.next();
  // Keep a list of bubbles with verification data
  activeBubbles.push(bubble.value.id);
  
  // Trim unnecessary data
  let delay;
  function trimBubble() {
    delay = bubble.value.delay;
    delete bubble.value.delay;
    delete bubble.done;
    bubble = bubble.value;
  }
  trimBubble();
  
  // Send the prepared bubble to the front end
  io.emit("bubble", bubble);

  // Check back to see if player clicked bubble in time
  setTimeout(() => {
    if (activeBubbles.includes(bubble.id)) {
      io.emit("endgame");
      finalScore = {
        time: time, 
        score: score,
      }
      gameConfig.gameActive = false;
      gameConfig.newGame = true;
      activeBubbles = [];
      time = 0;
      score = 0;
    }
  }, 1500 + bubble.duration); 

  // If the game is continuing, generate another bubble
  setTimeout(() => {
    if (gameConfig.gameActive) {
      bubbleTimer();
    }
  }, delay);
}

// ----------------------------------------------------------- SOCKET CONNECTION
io.on("connection", (socket) => {
  socket.on("difficulty", (data) => {
    gameConfig.difficulty = data;
  });

  socket.on("endgame", () => {
    gameConfig.gameActive = false;
  });

  socket.on("finalscore", () => {
    socket.emit("finalscore", finalScore);
  });

  socket.on("bubble", (data) => {
    let id = activeBubbles.indexOf(data);
    if (id >= 0) {
      activeBubbles.splice(id,1);
      score += 1;
      socket.emit("score", score);
    };
  });

  // On signal for game start
  socket.on("game", (data) => {
    gameConfig.gameActive = true;
    for (let i = 0;i < gameConfig.difficulty; i++) {
      bubbleTimer();
    }
    
    // Start timer
    var timer = setInterval(() => {
      if (gameConfig.gameActive) {
        time += 1;
        socket.emit("time", time);
      } else {
        time = 0;
        clearInterval(timer);
      }
    }, 1000);
    
    // Disconnect handler
    socket.on("disconnect", () => {
      gameConfig.gameActive = false;
      clearInterval(timer);
      time = 0;
    });
  });
});

httpServer.listen(4003);

app.listen(4000, () => {
  console.log('App running on localhost:4000\nBubble generator running on localhost:4003');
});
