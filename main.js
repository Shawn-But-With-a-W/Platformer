// Initialise a bunch of variables before the main loop
var _grav = false;
var groundTimer = 0;
var gravTimer = 0;
var airTimer = 0;
var _gravChanged = false;
var gravRevert = gravDir;
var changeGravDir = null;
var _isAlive = true;
var respawnTimer = 0;
var _waveDash = false;
var end = false;
var shakeTimer;
var _transition = false;
var transitionTimer = 0;
var xDisp, yDisp, lmx, lmy, lxx, lxy;
var timeCurrent, timePrev, timeDiff;
var _boundsSet = false;
var _gameComplete = false;
var _checkOutOfBounds = true;

// Pause the game at the beginning as the start screen
pause();

function mainLoop() {
	// Default colour, overridden later depending on conditions
	player.render.fillStyle = "#f5d3598f";

	// Check if it's on the ground and other obstacles
	_onGround = isOnGround();
	_onCeiling = isOnCeiling();
	_onLeftWall = isOnLeftWall();
	_onRightWall = isOnRightWall();

	var type = "air";
	// Reset all variables when landed on ground
	if (_onGround && !_gravChanged && !_gravReverted) {
		type = "hor";
		_grav = true;
		_gravReverted = false;
		_gravChanged = false;
		gravTimer = 0;
		gravRevert = gravDir;
		changeGravDir = null;
		groundTimer--;
	}

	// Start air timer when in air
	if (!_onGround) {
		airTimer++;
		groundTimer--;
	} else {
		airTimer = 0;
	}

	// Deceleration and capping max velocity when no keystrokes are pressed
	if (isNeutral()) {
		decel(type);
	}

	// Gravity

	// When gravity is changed temporarily in a direction
	if (_gravChanged) {
		gravTimer++;
		player.render.fillStyle = "#71aff8";

		// Cancel velocity on secondary axis to not move diagonally
		switch (changeGravDir) {
			case "up":
			case "down":
				cancelVel("x");
				break;
			case "left":
			case "right":
				cancelVel("y");
				break;
		}

		// Sticking to the direction gravity changed in while going upwards
		if (_onGround) {
			neutral();
			gravRevert = gravDir;
			changeGrav(gravDir);
			_gravChanged = false;
			_gravReverted = false;
			gravTimer = 0;
		}

		// Switching gravity back after 10 ticks
		if (gravTimer >= 10) {
			_gravReverted = true;
			changeGrav(gravRevert);
			_gravChanged = false;
		}
	} else {
		engine.gravity.scale = 0.001;
	}

	// After gravity switched back
	if (_gravReverted) {
		player.render.fillStyle = "#71b0f837";

		// Still sticking to the direction gravity previously changed in after revert
		switch (changeGravDir) {
			case "up":
				if (isOnUpObst()) {
					changeGrav("up");
					_gravReverted = false;
					neutral();
				}
				break;
			case "down":
				if (isOnDownObst()) {
					changeGrav("down");
					_gravReverted = false;
					neutral();
				}
				break;
			case "left":
				if (isOnLeftObst()) {
					changeGrav("left");
					_gravReverted = false;
					neutral();
				}
				break;
			case "right":
				if (isOnRightObst()) {
					changeGrav("right");
					_gravReverted = false;
					neutral();
				}
				break;
		}

		// Updating keysPressed record so keys/directions aren't incorrectly buffered after gravity change
		setDirectionsPressed();

		// Resetting values specifically after landing from gravity reversion
		if (_onGround) {
			type = "hor";
			_grav = true;
			_gravReverted = false;
			_gravChanged = false;
			gravTimer = 0;
			gravRevert = gravDir;
			changeGravDir = null;
			groundTimer = 18;
		}
	}

	// Implementing velocity cap if on ground for long enough
	if (groundTimer < 0) {
		maxVel(type);
		_waveDash = false;
		PARAMETERS.acc.hor = 0.5;
		PARAMETERS.acc.air = 0.6;
	}
	// Modifying values for wavedashing for short period of time
	else {
		if (directionsPressed["up"] == false) {
			_waveDash = true;
		}

		if (_waveDash) {
			PARAMETERS.acc.hor = 0.1;
			PARAMETERS.acc.air = 1;
		} else {
			maxVel(type);
		}
	}

	// Controlling gravity change
	if (_grav && !_onGround && airTimer >= 15) {
		player.render.fillStyle = "#f5d259";
		if (gravPressed["A"]) {
			changeGrav("left");
			_grav = false;
			_gravChanged = true;
			changeGravDir = "left";
			engine.gravity.scale = 0.002;
		} else if (gravPressed["D"]) {
			changeGrav("right");
			_grav = false;
			_gravChanged = true;
			changeGravDir = "right";
			engine.gravity.scale = 0.002;
		} else if (gravPressed["W"]) {
			changeGrav("up");
			_grav = false;
			_gravChanged = true;
			changeGravDir = "up";
			engine.gravity.scale = 0.002;
		} else if (gravPressed["S"]) {
			changeGrav("down");
			_grav = false;
			_gravChanged = true;
			changeGravDir = "down";
			engine.gravity.scale = 0.002;
		}
	}

	// Basic movement
	if (directionsPressed["up"] && _onGround) {
		jump();
	}
	if (directionsPressed["down"] && !_onGround && !_gravChanged) {
		fastFall();
	}
	if (directionsPressed["right"]) {
		move("right", type);
	}
	if (directionsPressed["left"]) {
		move("left", type);
	}

	// Walljump
	if (directionsPressed["up"] && directionsPressed["left"] && _onRightWall) {
		wallJump("left");
	} else if (directionsPressed["up"] && directionsPressed["right"] && _onLeftWall) {
		wallJump("right");
	}

	// Checking level completion
	const endObj = currentLevel.checkLevelComplete();
	if (endObj !== null) {
		_checkOutOfBounds = false;

		// Checking if the entire demo has been completed
		if (currentLevel.checkGameComplete(endObj)) {
			_gameComplete = true;
			_pausePressed = true;
			_checkOutOfBounds = false;
		}

		// Resetting and sleeping falling obstacles of previous level
		resetFalling(sleep=true);

		// Moving to the next level in the LEVELS array
		levelIndex = currentLevel.nextLevelIndex(endObj);
		currentLevel = currentLevel.nextLevel(endObj);
		_transition = true;
		transitionTimer = 0;

		// Waking up obstacles of current level
		resetFalling(sleep=false);

		// Setting values for moving camera later
		setBounds();
		xDisp = currentLevel.max.x - lxx;
		yDisp = currentLevel.max.y - lxy;
	}

	// Level transition
	if (_transition) {
		engine.timing.timeScale = 0;
		tween(transitionTimer, 40, xDisp, yDisp, easeInOutSine);
		transitionTimer++;

		// Transition ends after 42 frames
		if (transitionTimer >= 42) {
			_transition = false;
			engine.timing.timeScale = 1;
			_grav = true;
			_gravChanged = false;
			_gravReverted = false;
			_checkOutOfBounds = true;

			// Level transition after final level
			if (_gameComplete) {
				changeGrav("down");
				gravRevert = "down";
				Body.setVelocity(player, { x: 0, y: 0 });
				Body.setPosition(player, currentLevel.spawn);
				neutral();
			}

			// Pause after the transition occurs (buffered pause)
			if (_pausePressed) {
				pause();
			}
		}
	}

	// Dumb ways to die (and some less dumb ones)
	if (_isAlive) {
		respawnTimer = 0;
		// Hitting spikes
		checkHitSpikes();

		// Falling out of bounds
		if (_checkOutOfBounds && currentLevel.isOutOfBounds()) {
			death();
		}
	} else {
		setBounds();

		screenShakeDeath(respawnTimer, "death");
		respawnTimer++;
		// Respawn after set amount of time
		if (respawnTimer >= 100) {
			respawn(currentLevel.spawn);
			respawnTimer = 0;
			if (_pausePressed) {
				pause();
			}
		}
		// Change speed of death animation depending on amount of time after death
		else if (respawnTimer >= 30) {
			engine.timing.timeScale = 1;
		} else if (respawnTimer >= 15) {
			engine.timing.timeScale = 0.75;
		}
	}

	// Allow other viewport animations to take priority
	if (_isAlive && !_transition && shakeTimer <= 40) {
		screenShakeGrav(shakeTimer, changeGravDir);
		shakeTimer++;
	}

	// Pausing when tabbed out
	if (document.hasFocus() == false && _paused == false) {
		_pausePressed = true;
		pause();
	}

	timePrev = timeCurrent;
	timeCurrent = new Date().getTime();
	// timeDiff is set differently for first iteration
	timeDiff = typeof timePrev === "number" ? timeCurrent - timePrev : 1000 / 60;

	// Updating physics and looping again
	requestAnimationFrame(mainLoop);
	Engine.update(engine, timeDiff);
}
mainLoop();
