// TODO: add acceleration and deceleration
// TODO: add obstacles and test

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

// Create box and ground
var player = Bodies.rectangle(640, 0, 80, 80, {friction : 0, frictionAir : 0, frictionStatic : 0});
player.timeScale = 1;
var ground = Bodies.rectangle(640, 575, 1280, 30, {isStatic: true});
var collidableBodies = [ground];

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

(function mainLoop() {
    var _onGround = (Collision.collides(player, ground) != null);

    let type;
    (_onGround) ? (type="hor") : (type="air");
    

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

    decel(type);
    maxVel(type);

    
    window.requestAnimationFrame(mainLoop);
    Engine.update(engine, 1000 / 60);
})();