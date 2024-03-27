// TODO: can only change gravity on ground

// TODO: hold down up, change grav mid air, land on wall fix

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
    for (let ground of OBSTACLES.down) {
        console.log(ground);
        if (Collision.collides(player, ground) != null) {
            _onGround = true;
            type = "hor";
            break
        }
    }
    console.log(_onGround);

    var _onLeftWall = false;
    for (let leftWall of OBSTACLES.left) {
        if (Collision.collides(player, leftWall) != null) {
            _onLeftWall = true;
            break
            }
    }

    var _onrightWall = false;
    for (let rightWall of OBSTACLES.right) {
        if (Collision.collides(player, rightWall) != null) {
            _onrightWall = true;
            break
            }
    }
    

    // Move the box according to keyboard inputs
    if (directionsPressed["up"] && _onGround) {
            jump();
            console.log("attempted to jump");
    }
    if (directionsPressed["down"] && !_onGround) {
        fastFall();
    }
    if (directionsPressed["right"]) {
        move('right', type);
    }
    if (directionsPressed["left"]) {
        move('left', type);
    }
    
    if (directionsPressed["up"] && directionsPressed["left"] && _onrightWall) {
            wallJump("left");
    }
    else if (directionsPressed["up"] && directionsPressed["right"] && _onLeftWall) {
            wallJump("right");
        }

    decel(type);
    maxVel(type);

    
    window.requestAnimationFrame(mainLoop);
    Engine.update(engine, 1000 / 60);
})();