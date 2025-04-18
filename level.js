class Level {
	constructor(min, max, spawn, ends) {
		this.min = min;
		this.max = max;
		this.spawn = spawn;
		this.ends = ends;

		this.xMin = min.x;
		this.xMax = max.x;
		this.yMin = min.y;
		this.yMax = max.y;
	}

	// If the player is off screen
	isOutOfBounds() {
		if (
			player.position.x > this.xMax ||
			player.position.x < this.xMin ||
			player.position.y > this.yMax ||
			player.position.y < this.yMin
		) {
			return true;
		} else {
			return false;
		}
	}

	// Jarrett wrote this comment
	/**
	 * @returns end object or null if not colliding
	 */
	checkLevelComplete() {
		for (const endObj of this.ends) {
			if (endObj.range.checkCollision()) {
				return endObj;
			}
		}
		return null;
	}

	nextLevelIndex(end) {
		return end.next;
	}

	nextLevel(end) {
		return LEVELS[end.next];
	}

	checkGameComplete(end) {
		// Checking if it is on the last level and transitioning towards the first
		if (this.nextLevelIndex(end) == 0 && levelIndex == 2) {
			return true;
		} else {
			return false;
		}
	}
}

// Array of all Level objects
const LEVELS = [
	new Level({ x: 0, y: 0 }, { x: 1280, y: 650 }, { x: 640, y: 100 }, [{ range: transitioner0To1, next: 1 }]),
	new Level({ x: -1080, y: -450 }, { x: 200, y: 200 }, { x: -100, y: -50 }, [
		{ range: transitioner1To0, next: 0 },
		{ range: transitioner1To2, next: 2 },
	]),
	new Level({ x: -1280, y: -1000 }, { x: 0, y: -350 }, { x: -120, y: -900 }, [
		{ range: transitioner2To1, next: 1 },
		{ range: transitionerEnd, next: 0 },
	]),
];
var levelIndex = 0;
var currentLevel = LEVELS[levelIndex];
