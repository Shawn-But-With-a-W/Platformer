// TODO: add acceleration and deceleration
// TODO: add obstacles and test

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element : document.body,
    engine : engine,
    options : {
        width : 1280, 
        height : 575, 
        background : "#c2c2c2", 
        wireframes : false,
        showAngleIndicator : true,
        showAxes : true,
        showBounds : true,
        showCollisions : true,
        showDebug : true,
        showIds : true,
        showPositions : true,
        showVelocity : true,
},});

// Create box and ground
var player = Bodies.rectangle(640, 0, 80, 80, {friction : 0, frictionAir : 0, frictionStatic : 0});
var ground = Bodies.rectangle(640, 575, 1280, 30, {isStatic: true});

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

// keep the mouse in sync with rendering
render.mouse = mouse;


// add all of the bodies to the world
Composite.add(engine.world, [player, ground, mouseConstraint]);

// run the renderer
Render.run(render);

// Record of whether a key is currently being pressed
var keysPressed = {"ArrowUp" : false, "ArrowDown" : false, "ArrowRight" : false, "ArrowLeft" : false};

// Change the key's corresponding value (get it?) to be true when pressed
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            keysPressed["ArrowUp"] = true;
            break;
        case "ArrowDown":
            keysPressed["ArrowDown"] = true;
            break;
        case "ArrowRight":
            keysPressed["ArrowRight"] = true;
            break;
        case "ArrowLeft":
            keysPressed["ArrowLeft"] = true;
    }});

// Change the key's corresponding value to be false when released
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowUp":
            keysPressed["ArrowUp"] = false;
            break;
        case "ArrowDown":
            keysPressed["ArrowDown"] = false;
            break;
        case "ArrowRight":
            keysPressed["ArrowRight"] = false;
            break;
        case "ArrowLeft":
            keysPressed["ArrowLeft"] = false;
    }});




(function mainLoop() {
    // Move the box according to keyboard inputs
    if (keysPressed["ArrowUp"] == true) {
        jump();
    }
    if (keysPressed["ArrowDown"] == true) {
        fastFall();
    }
    if (keysPressed["ArrowRight"] == true) {
        move('right');
    }
    if (keysPressed["ArrowLeft"] == true) {
        move('left');
    }

    // Maximum velocity
    if (player.velocity.x > horMax) {
        Body.setVelocity(player, {x : horMax, y : player.velocity.y});
    }
    if (player.velocity.x < -horMax) {
        Body.setVelocity(player, {x : -horMax, y : player.velocity.y});
    }
    if (player.velocity.y > verMax) {
        Body.setVelocity(player, {x : player.velocity.x, y : verMax});
    }
    if (player.velocity.y < -verMax) {
        Body.setVelocity(player, {x : player.velocity.x, y : -verMax});
    }
    

    window.requestAnimationFrame(mainLoop);
    Engine.update(engine, 1000 / 60);
})();