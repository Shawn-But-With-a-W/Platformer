// All of these functions do basically the same thing, just for different objects

// Relative direction obstacles (from box's point of view assuming gravity always pulls downwards)

function isOnGround() {
	var _onGround = false;
	for (const ground of OBSTACLES.down) {
		if (Collision.collides(player, ground) !== null) {
			_onGround = true;
			break;
		}
	}
	return _onGround;
}

function isOnCeiling() {
	var _onCeiling = false;
	for (const ceiling of OBSTACLES.up) {
		if (Collision.collides(player, ceiling) !== null) {
			_onCeiling = true;
			break;
		}
	}
	return _onCeiling;
}

function isOnLeftWall() {
	var _onLeftWall = false;
	for (const leftWall of OBSTACLES.left) {
		if (Collision.collides(player, leftWall) !== null) {
			_onLeftWall = true;
			break;
		}
	}
	return _onLeftWall;
}

function isOnRightWall() {
	var _onRightWall = false;
	for (const rightWall of OBSTACLES.right) {
		if (Collision.collides(player, rightWall) !== null) {
			_onRightWall = true;
			break;
		}
	}
	return _onRightWall;
}

// Absoulte direction obstacles

function isOnUpObst() {
	var _onUpObst = false;
	for (const upObst of UPOBST) {
		if (Collision.collides(player, upObst) != null) {
			_onUpObst = true;
			break;
		}
	}
	return _onUpObst;
}

function isOnDownObst() {
	var _onDownObst = false;
	for (const downObst of DOWNOBST) {
		if (Collision.collides(player, downObst) != null) {
			_onDownObst = true;
			break;
		}
	}
	return _onDownObst;
}

function isOnLeftObst() {
	var _onLeftObst = false;
	for (const leftObst of LEFTOBST) {
		if (Collision.collides(player, leftObst) != null) {
			_onLeftObst = true;
			break;
		}
	}
	return _onLeftObst;
}

function isOnRightObst() {
	var _onRightObst = false;
	for (const rightObst of RIGHTOBST) {
		if (Collision.collides(player, rightObst) != null) {
			_onRightObst = true;
			break;
		}
	}
	return _onRightObst;
}
