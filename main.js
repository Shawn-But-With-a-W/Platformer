// TODO: Can only gravity change when one direction key is pressed

// TODO: Make wavedashes non-bufferable

// Initialise a bunch of variables before the main loop
var _grav = false;
var groundTimer = 0
var gravTimer = 0;
var airTimer = 0;
var _gravChanged = false;
var _gravReverted = false;
var gravRevert = gravDir;
var changeGravDir = "";
var _isAlive = true;
var respawnTimer = 0;

(function mainLoop() {
    // Check if it's on the ground
    _onGround = isOnGround();
    _onCeiling = isOnCeiling();
    _onLeftWall = isOnLeftWall();
    _onRightWall = isOnRightWall();

    var type = "air";
    // Reset all variables when landed on ground
    if (_onGround  && !_gravChanged && !_gravReverted) {
        type = "hor";
        _grav = true;
        _gravReverted = false;
        _gravChanged = false;
        gravTimer = 0;
        gravRevert = gravDir;
        changeGravDir = "";
        groundTimer--;
    }

    // Start air timer when in air
    if (!_onGround) {
        airTimer++;
        groundTimer--;
    }
    else {
        airTimer = 0;
    }

    // Detecting if hit a spike
    if (_isAlive) {
        respawnTimer = 0;
        for (let spikeObj of SPIKES) {
            if (spikeObj.hitSpikes()) {
                    death();
                    _isAlive = false;
            }
        }
    }
    else {
        respawnTimer++;
        // Respawn after set amount of time
        if (respawnTimer >= 100) {
            respawn();
            _isAlive = true;
        }
        // Change speed of death animation depending on amount of time after death
        else if (respawnTimer >= 20) {
            engine.timing.timeScale = 1;
        }
        else if (respawnTimer >= 10) {
            engine.timing.timeScale = 0.5;
        }
    }

    // Deceleration and capping max velocity
    if (isNeutral()) {
        decel(type);
    }

    if (groundTimer < 0) {
        maxVel(type);
        PARAMETERS.acc.hor = 0.5;
        PARAMETERS.acc.air = 0.6;
    }
    // Modifying values for wavedashing
    else {
        PARAMETERS.acc.hor = 0.1;
        PARAMETERS.acc.air = 1;
    }

    // Gravity takes priority over other movement
    if (_grav && !_onGround && airTimer >= 15) {
        player.render.fillStyle = "#f5d259";
        if (keysPressed["ArrowLeft"] && _gravPressed) {
            changeGrav("left");
            _grav = false;
            _gravChanged = true;
            changeGravDir = "left";
            engine.gravity.scale = 0.002;
        }
        else if (keysPressed["ArrowRight"] && _gravPressed) {
            changeGrav("right");
            _grav = false;
            _gravChanged = true;
            changeGravDir = "right";
            engine.gravity.scale = 0.002;

        }
        else if (keysPressed["ArrowUp"] && _gravPressed) {
            changeGrav("up");
            _grav = false;
            _gravChanged = true;
            changeGravDir = "up";
            engine.gravity.scale = 0.002;

        }
        else if (keysPressed["ArrowDown"] && _gravPressed) {
            changeGrav("down");
            _grav = false;
            _gravChanged = true;
            changeGravDir = "down";
            engine.gravity.scale = 0.002;
        }
    }
    else {
        player.render.fillStyle = "#f5d35987";
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

    if (_gravChanged) {
        gravTimer++;
        player.render.fillStyle = "#71aff8";

        // Cancel velocity on secondary axis to not move diagonally
        switch (changeGravDir) {
            case "up":
            case "down":
                cancelVel("x");
                break
            case "left":
            case "right":
                cancelVel("y");
                break
        }

        // Switching gravity back after 10 ticks
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
        
        // Still sticking to the direction gravity previously changed in after revert
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

        // Updating keysPressed record so keys/directions aren't incorrectly buffered after gravity change
        for (let key of Object.keys(keysPressed)) {
            if (!keysPressed[key]) {
                directionsPressed[KEYSTROKE_TO_DIRECTION[key]] = false;
            }
        }

        // Resetting values specifically after gravity change
        if (_onGround) {
            type = "hor";
            _grav = true;
            _gravReverted = false;
            _gravChanged = false;
            gravTimer = 0;
            gravRevert = gravDir;
            changeGravDir = "";
            groundTimer = 11;
        }
    }
    

    window.requestAnimationFrame(mainLoop);
    Engine.update(engine, 1000 / 60);
    })();