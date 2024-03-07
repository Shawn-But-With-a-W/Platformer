// TODO: add obstacles and test
// TODO: switch gravity
// TODO: scale time

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
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

// add all of the bodies to the world
Composite.add(engine.world, [player, floor, ceiling, wallLeft, wallRight, mouseConstraint]);

// run the renderer
Render.run(render);

(function mainLoop() {
    var _onGround = false;
    var type = "air";
    for (let ground of downObst) {
        if (Collision.collides(player, ground) != null) {
            _onGround = true;
            type = "hor";
            break
        }
    }

    var _onLeftWall = false;
    for (let leftWall of leftObst) {
        if (Collision.collides(player, leftWall) != null) {
            _onLeftWall = true;
            }
            break
    }

    var _onrightWall = false;
    for (let rightWall of rightObst) {
        if (Collision.collides(player, rightWall) != null) {
            _onrightWall = true;
            }
            break
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
    
    if (keysPressed["ArrowUp"] && keysPressed["ArrowLeft"] && _onrightWall) {
            wallJump("left");
    }
    else if (keysPressed["ArrowUp"] && keysPressed["ArrowRight"] && _onLeftWall) {
            wallJump("right");
        }

    decel(type);
    maxVel(type);

    
    window.requestAnimationFrame(mainLoop);
    Engine.update(engine, 1000 / 60);
})();