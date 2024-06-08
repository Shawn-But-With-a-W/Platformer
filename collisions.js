function isOnGround() {
	var _onGround = false;
	for (let ground of OBSTACLES.down) {
		if (Collision.collides(player, ground) != null) {
			_onGround = true;
			break;
		}
	}
	return _onGround;
}

function isOnCeiling() {
	var _onCeiling = false;
	for (let ceiling of OBSTACLES.up) {
		if (Collision.collides(player, ceiling) != null) {
			_onCeiling = true;
			break;
		}
	}
	return _onCeiling;
}

function isOnLeftWall() {
	var _onLeftWall = false;
	for (let leftWall of OBSTACLES.left) {
		if (Collision.collides(player, leftWall) != null) {
			_onLeftWall = true;
			break;
		}
	}
	return _onLeftWall;
}

function isOnRightWall() {
	var _onRightWall = false;
	for (let rightWall of OBSTACLES.right) {
		if (Collision.collides(player, rightWall) != null) {
			_onRightWall = true;
			break;
		}
	}
	return _onRightWall;
}

function isOnUpObst() {
	var _onUpObst = false;
	for (let upObst of UPOBST) {
		if (Collision.collides(player, upObst) != null) {
			_onUpObst = true;
			break;
		}
	}
	return _onUpObst;
}

function isOnDownObst() {
	var _onDownObst = false;
	for (let downObst of DOWNOBST) {
		if (Collision.collides(player, downObst) != null) {
			_onDownObst = true;
			break;
		}
	}
	return _onDownObst;
}

function isOnLeftObst() {
	var _onLeftObst = false;
	for (let leftObst of LEFTOBST) {
		if (Collision.collides(player, leftObst) != null) {
			_onLeftObst = true;
			break;
		}
	}
	return _onLeftObst;
}

function isOnRightObst() {
	var _onRightObst = false;
	for (let rightObst of RIGHTOBST) {
		if (Collision.collides(player, rightObst) != null) {
			_onRightObst = true;
			break;
		}
	}
	return _onRightObst;
}
