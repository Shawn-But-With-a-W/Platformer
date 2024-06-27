var _paused = false;

function pause() {
	if (_isAlive && !_transition) {
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
