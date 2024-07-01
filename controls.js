// Record of whether a direction key is currently being pressed
var keysPressed = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
// Record of whether a direction is being pressed (converted from keysPressed)
var directionsPressed = { up: false, down: false, left: false, right: false };
var _gravPressed = false;
var _pausePressed = false;

// Change the key's corresponding value (get it?) to be true when pressed
window.addEventListener("keydown", (event) => {
	switch (event.key) {
		// Switch fallthrough (weird syntax I know)
		case "ArrowUp":
		case "ArrowDown":
		case "ArrowRight":
		case "ArrowLeft":
			keysPressed[event.key] = true;
			directionsPressed[KEYSTROKE_TO_DIRECTION[event.key]] = true;
			break;

		case " ":
			_gravPressed = true;
			break;
		case "Escape":
			_pausePressed = true;
			pause();
			break;
	}
});

// Change the key's corresponding value to be false when released
window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "ArrowUp":
		case "ArrowDown":
		case "ArrowRight":
		case "ArrowLeft":
			keysPressed[event.key] = false;
			directionsPressed[KEYSTROKE_TO_DIRECTION[event.key]] = false;
			break;

		case " ":
			_gravPressed = false;
			break;
	}
});

// Removes all keystrokes and directions
function neutral() {
	keysPressed = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
	directionsPressed = { up: false, down: false, left: false, right: false };
	_gravPressed = false;
}

// Returns if no keys pare being pressed
function isNeutral() {
	var directions = Object.keys(directionsPressed);
	var _isNeutral = true;

	for (const direction of directions) {
		if (directionsPressed[direction] == true) {
			_isNeutral = false;
			break;
		}
	}

	return _isNeutral;
}
