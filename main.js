// TODO: add obstacles and test
// TODO: switch gravity
// TODO: scale time

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Collision = Matter.Collision,
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

// Create box and ground
var player = Bodies.rectangle(640, 0, 40, 40, {friction : 0, frictionAir : 0, frictionStatic : 0});
player.timeScale = 1;
var floor = Bodies.rectangle(640, 575, 1280, 30, {isStatic: true});
var wall1 = Bodies.rectangle(0, 287, 30, 575, {isStatic : true});
var wall2 = Bodies.rectangle(1280, 287, 30, 575, {isStatic : true});
var grounds = [floor];
var walls = [wall1, wall2];


// add all of the bodies to the world
Composite.add(engine.world, [player, floor, wall1, wall2, mouseConstraint]);

// run the renderer
Render.run(render);

(function mainLoop() {
    var _onGround = false;
    var type = "air";
    for (let ground of grounds) {
        if (Collision.collides(player, ground) != null) {
            _onGround = true;
            type = "hor";
            break
        }
    }

    var _onWall = false;
    for (let wall of walls) {
        if (Collision.collides(player, wall) != null) {
            _onWall = true;
            if (wall.position.x > player.position.x) {
                var wallDir = "right";
            }
            else if (wall.position.x < player.position.x) {
                var wallDir = "left"
            }
            break
        }
    }
    

    // Move the box according to keyboard inputs
    if (keysPressed["ArrowUp"] && _onGround) {
            jump();
    }
    if (keysPressed["ArrowDown"]) {
        fastFall();
    }
    if (keysPressed["ArrowRight"]) {
        move('right', type);
    }
    if (keysPressed["ArrowLeft"]) {
        move('left', type);
    }
    if (keysPressed["ArrowUp"] && _onWall) {
        if (wallDir == "right" && keysPressed["ArrowLeft"]) {
            wallJump("left");
        }
        else if (wallDir == "left" && keysPressed["ArrowRight"]) {
            wallJump("right");
        }
    }

    decel(type);
    maxVel(type);

    
    window.requestAnimationFrame(mainLoop);
    Engine.update(engine, 1000 / 60);
})();