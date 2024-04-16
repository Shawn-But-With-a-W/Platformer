// TODO: Add level storage

// TODO: Design a level

// TODO: fix switching grav left or right when on down ground

// TODO: Allow to cling on wall even in phase 2, with colour coding working

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
var gravTimer = 0;
var _gravChanged = false;
var _gravReverted = false;
var gravRevert = gravDir;

(function mainLoop() {
    // Check if it's on the ground
    var _onGround = false;
    var type = "air";
    for (let ground of OBSTACLES.down) {
        if (Collision.collides(player, ground) != null) {
            _onGround = true;
            type = "hor";
            _grav = true;
            break
        }
    }

    // Check if on ceiling

    var _onCeiling = false;
    for (let ceiling of OBSTACLES.up) {
        if (Collision.collides(player, ceiling) != null) {
            _onCeiling = true;
            break
            }
    }

    // Check if it's on any walls

    var _onLeftWall = false;
    for (let leftWall of OBSTACLES.left) {
        if (Collision.collides(player, leftWall) != null) {
            _onLeftWall = true;
            break
            }
    }

    var _onRightWall = false;
    for (let rightWall of OBSTACLES.right) {
        if (Collision.collides(player, rightWall) != null) {
            _onRightWall = true;
            break
            }
    }
    

    // Move the box according to keyboard inputs
    if (directionsPressed["up"] && _onGround) {
        jump();
    }
    if (directionsPressed["down"] && !_onGround && !_gravChanged) {
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

    decel(type);
    maxVel(type);

    if (_grav) {
        player.render.fillStyle = "#f5d259";
        if (gravPressed["W"]) {
            changeGrav("up");
            _grav = false;
            _gravChanged = true;
        }
        else if (gravPressed["S"]) {
            changeGrav("down");
            _grav = false;
            _gravChanged = true;
        }
        else if (gravPressed["A"]) {
            changeGrav("left");
            _grav = false;
            _gravChanged = true;
        }
        else if (gravPressed["D"]) {
            changeGrav("right");
            _grav = false;
            _gravChanged = true;
        }

    }


    if (_gravChanged) {
        gravTimer++;
        player.render.fillStyle = "#71aff8";

        if (gravTimer >= 20) {
            changeGrav(gravRevert);
            _gravReverted = true;
        }

        if (_onGround && gravTimer >= 5) {
            gravRevert = gravDir;
            changeGrav(gravRevert);
            _gravChanged = false;
            _gravReverted = false;
            gravTimer = 0;
        }
    }

    if (_gravReverted) {
        player.render.fillStyle = "#71b0f837";

        if (_onCeiling) {
            switch (gravDir) {
                case "down":
                    gravRevert = "up";
                    break
                case "up":
                    gravRevert = "down";
                    break
                case "left":
                    gravRevert = "right";
                    break
                case "right":
                    gravRevert = "left";
                    break
            }

            changeGrav(gravRevert);
            _gravChanged = false;
            _gravReverted = false;
        }
    }

    gravPressed = { "W" : false, "A" : false, "S" : false, "D" : false };

    window.requestAnimationFrame(mainLoop);
    Engine.update(engine, 1000 / 60);
})();