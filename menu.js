var _paused = false;
var _initialBoot = true;

function pause() {
	if (_initialBoot) {
		document.getElementById("resume-text").innerText = "START GAME";
		_initialBoot = false;
	} else if (_gameComplete) {
		document.getElementById("resume-text").innerText = "DEMO COMPLETE";
	} else {
		document.getElementById("resume-text").innerText = "RESUME";
	}
	if (_isAlive && !_transition) {
		if (_pausePressed) {
			_pausePressed = false;
		}
		_gameComplete = false;

		if (_paused) {
			document.getElementById("pause").style.display = "none";
			_paused = false;
			engine.timing.timeScale = 1;
		} else {
			document.getElementById("pause").style.display = "block";
			_paused = true;
			engine.timing.timeScale = 0;
		}
	}
}

function wireframe() {
	render.options.wireframes = !render.options.wireframes;
	if (render.options.wireframes) {
		document.getElementById("wireframe-text").innerText = "WIREFRAMES: ON";
	} else {
		document.getElementById("wireframe-text").innerText = "WIREFRAMES: OFF";
	}
}
