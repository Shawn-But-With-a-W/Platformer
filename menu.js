var _paused = false;

function pause() {
	if (_isAlive && !_transition) {
		if (_paused) {
			document.getElementById("pause").style.display = "none";
			_paused = false;
			engine.timing.timeScale = 1;
			// requestAnimationFrame(mainLoop);
		} else {
			document.getElementById("pause").style.display = "block";
			_paused = true;
			engine.timing.timeScale = 0;
			// cancelAnimationFrame(animationFrame);
		}
	}
}
