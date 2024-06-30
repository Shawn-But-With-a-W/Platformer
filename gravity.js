// Initialise gravity
var gravDir = "down";
var _gravReverted = false;

// Initialise directions

var DIRECTION_TO_VALUE = {
	up: { axis: "y", sign: -1 },
	down: { axis: "y", sign: 1 },
	left: { axis: "x", sign: -1 },
	right: { axis: "x", sign: 1 },
};

var KEYSTROKE_TO_DIRECTION = {
	ArrowUp: "up",
	ArrowDown: "down",
	ArrowLeft: "left",
	ArrowRight: "right",
};

function changeGrav(dir) {
	// This is the most efficient way I could think of to do this...
	shakeTimer = 0;
	switch (dir) {
		case "down":
			engine.gravity = { x: 0, y: 1 };
			gravDir = "down";

			cancelVel("x");
			if (player.velocity.y < PARAMETERS.acc.grav && !_gravReverted) {
				Body.setVelocity(player, { x: player.velocity.x, y: PARAMETERS.acc.grav });
				console.log("force velocity down");
			}

			DIRECTION_TO_VALUE = {
				up: { axis: "y", sign: -1 },
				down: { axis: "y", sign: 1 },
				left: { axis: "x", sign: -1 },
				right: { axis: "x", sign: 1 },
			};

			KEYSTROKE_TO_DIRECTION = {
				ArrowUp: "up",
				ArrowDown: "down",
				ArrowLeft: "left",
				ArrowRight: "right",
			};

			OBSTACLES = {
				up: UPOBST,
				down: DOWNOBST,
				left: LEFTOBST,
				right: RIGHTOBST,
			};

			break;

		case "up":
			engine.gravity = { x: 0, y: -1 };
			gravDir = "up";

			cancelVel("x");
			if (player.velocity.y > -PARAMETERS.acc.grav && !_gravReverted) {
				Body.setVelocity(player, { x: player.velocity.x, y: -PARAMETERS.acc.grav });
				console.log("force velocity up");
			}

			DIRECTION_TO_VALUE = {
				up: { axis: "y", sign: 1 },
				down: { axis: "y", sign: -1 },
				left: { axis: "x", sign: -1 },
				right: { axis: "x", sign: 1 },
			};

			KEYSTROKE_TO_DIRECTION = {
				ArrowUp: "down",
				ArrowDown: "up",
				ArrowLeft: "left",
				ArrowRight: "right",
			};

			OBSTACLES = {
				up: DOWNOBST,
				down: UPOBST,
				left: LEFTOBST,
				right: RIGHTOBST,
			};

			break;

		case "left":
			engine.gravity = { x: -1, y: 0 };
			gravDir = "left";

			cancelVel("y");
			if (player.velocity.x > -PARAMETERS.acc.grav && !_gravReverted) {
				Body.setVelocity(player, { x: -PARAMETERS.acc.grav, y: player.velocity.y });
				console.log("force velocity left");
			}

			DIRECTION_TO_VALUE = {
				up: { axis: "x", sign: 1 },
				down: { axis: "x", sign: -1 },
				left: { axis: "y", sign: -1 },
				right: { axis: "y", sign: 1 },
			};

			KEYSTROKE_TO_DIRECTION = {
				ArrowUp: "left",
				ArrowDown: "right",
				ArrowLeft: "down",
				ArrowRight: "up",
			};

			OBSTACLES = {
				up: RIGHTOBST,
				down: LEFTOBST,
				left: UPOBST,
				right: DOWNOBST,
			};

			break;

		case "right":
			engine.gravity = { x: 1, y: 0 };
			gravDir = "right";

			cancelVel("y");
			if (player.velocity.x < PARAMETERS.acc.grav && !_gravReverted) {
				Body.setVelocity(player, { x: PARAMETERS.acc.grav, y: player.velocity.y });
				console.log("force velocity right");
			}

			DIRECTION_TO_VALUE = {
				up: { axis: "x", sign: -1 },
				down: { axis: "x", sign: 1 },
				left: { axis: "y", sign: 1 },
				right: { axis: "y", sign: -1 },
			};

			KEYSTROKE_TO_DIRECTION = {
				ArrowUp: "right",
				ArrowDown: "left",
				ArrowLeft: "up",
				ArrowRight: "down",
			};

			OBSTACLES = {
				up: LEFTOBST,
				down: RIGHTOBST,
				left: DOWNOBST,
				right: UPOBST,
			};

			break;
	}
}
