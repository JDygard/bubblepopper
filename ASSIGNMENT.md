# Brief

You are tasked with developing the game logic and application for a web-based bubble popping game. The game is supposed to be designed as a web application, with a backend which handles the game rules, and a frontend that is strictly concerned with the user interface.

Bubbles should be generated and validated on the backend to make the game cheating resistant, and the backend should communicate with the frontend continuously by using websockets.

A frontend skeleton and simple web server is provided for you.

**This is a new assignment and may have flaws. Please email us if you think something is broken with the assignment or the requirements are unclear.**

## Goals

* Create a web system (frontend & backend) that completes the bubble popping game.
* The websocket server (part of your backend) should send information about spawned bubbles, and await messages from the client when a bubble has been popped

## Game rules

* Bubbles should appear at random positions on screen
* The time interval between bubble spawns should change, start out slow and go faster and faster. Adding a random element is appreciated
* Bubbles should stay alive for a random time period, use your judgement for setting the limits to make the game challenging and fair.
* Multiple bubbles are allowed on the screen at the same time.
* If a bubble bursts (times out) before the player pops it, the game is over.
* Game score is the number of bubbles popped.

## Constraints

* You can assume that the WebSocket service is only to be used by one user at a time
* You must use Typescript and React for the frontend part of this assignment
* You must use either TypeScript, Rust, Python or Kotlin for the backend
* Backend must serve the compiled frontend app and also have websocket endpoint(s) for the frontend.
* Use helpful 3rd party modules like CSS tools and Node packages - show us what you think is useful for the task.

## Assignment criteria

This is what we are looking to assess with this assignment:

* A working implementation - a playable game
* Your defined WebSocket protocol between backend and client
* Code quality
* Application architecture - decisions made on component design and reusability
* State and error handling - mitigating unexpected combinations of application state
* Responsive design

This will not be assessed or penalised:

* Code testing
* Code documentation (please do provide a README explaining how to run your code however)
* Minor bugs in the functionality of your solution (if you know of some bugs that you won't be able to fix in time, feel free to mention them to us)
* Security of the API
* Multiplayer functionality 
* Graphical design, artwork, animations or sound effects
* Little mistakes, typos, etc.
* Sending us any questions or comments via email

---

Best of luck! If you have any questions or comments, we'd love to hear it. Shoot your contact an email and we'll see what we can do.
