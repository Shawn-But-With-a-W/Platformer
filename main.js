// TODO: Change gravity to key + direction activation

// TODO: Add ground timer. When ground timer within set value, maximum velocity does not apply

// TODO: Figure out how to properly resize the window

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

// Initialise a bunch of variables before the main loop
var _grav = false;
var groundTimer = 0
var gravTimer = 0;
var _gravChanged = false;
var _gravReverted = false;
var gravRevert = gravDir;
var changeGravDir = "";

(function mainLoop() {
    // Check if it's on the ground
    _onGround = isOnGround();
    _onCeiling = isOnCeiling();
    _onLeftWall = isOnLeftWall();
    _onRightWall = isOnRightWall();

    var type = "air";
    if (_onGround) {
        type = "hor";
        _grav = true;
        _gravReverted = false;
        _gravChanged = false;
        gravTimer = 0;
        gravRevert = gravDir;
        changeGravDir = "";
    }
    

    // Move the box according to keyboard inputs
    if (directionsPressed["up"] && _onGround) {
        jump();
    }
    if (directionsPressed["down"] && !_onGround && !_gravChanged ) {
        fastFall();
    }
    if (directionsPressed["right"]) {
        move('right', type);
    }
    if (directionsPressed["left"]) {
        move('left', type);
    }

    if (directionsPressed["up"] && directionsPressed["left"] && _onRightWall) {
        wallJump("left");
    }
    else if (directionsPressed["up"] && directionsPressed["right"] && _onLeftWall) {
        wallJump("right");
    }

    // Deceleration and capping max velocity
    if (isNeutral()) {
        decel(type);
    }
    maxVel(type);


    // Big mess of changing gravity below

    if (_grav) {
        player.render.fillStyle = "#f5d259";
        if (gravPressed["W"]) {
            changeGrav("up");
            _grav = false;
            _gravChanged = true;
            changeGravDir = "up";
        }
        else if (gravPressed["S"]) {
            changeGrav("down");
            _grav = false;
            _gravChanged = true;
            changeGravDir = "down";
        }
        else if (gravPressed["A"]) {
            changeGrav("left");
            _grav = false;
            _gravChanged = true;
            changeGravDir = "left";
        }
        else if (gravPressed["D"]) {
            changeGrav("right");
            _grav = false;
            _gravChanged = true;
            changeGravDir = "right";
        }
    }

    if (_gravChanged) {
        engine.gravity.scale = 0.003;
        gravTimer++;
        player.render.fillStyle = "#71aff8";

        if (gravTimer >= 10) {
            changeGrav(gravRevert);
            _gravReverted = true;
            _gravChanged = false;
        }

        // Sticking to the direction gravity changed in while going upwards
        if (_onGround && gravTimer >= 3) {
            gravRevert = gravDir;
            changeGrav(gravRevert);
            _gravChanged = false;
            _gravReverted = false;
            gravTimer = 0;
            neutral();
        }
    }
    else {
        engine.gravity.scale = 0.001;
    }

    if (_gravReverted) {
        player.render.fillStyle = "#71b0f837";
        
        // Sticking to the direction gravity changed in while falling back down
        switch (changeGravDir) {
            case "up":
                if (isOnUpObst()) {
                    changeGrav("up");
                    _gravReverted  = false;
                    neutral();
                }
                break
            case "down":
                if (isOnDownObst()) {
                    changeGrav("down");
                    _gravReverted  = false;
                    neutral();
                }
                break
            case "left":
                if (isOnLeftObst()) {
                    changeGrav("left");
                    _gravReverted  = false;
                    neutral();
                }
                break
            case "right":
                if (isOnRightObst()) {
                    changeGrav("right");
                    _gravReverted  = false;
                    neutral();
                }
                break
        }

    }
    

    window.requestAnimationFrame(mainLoop);
    Engine.update(engine, 1000 / 60);
    })();