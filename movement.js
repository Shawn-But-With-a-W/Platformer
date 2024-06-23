var PARAMETERS = {
	acc: { hor: 0.5, air: 0.6, jump: 7, fall: 1, wall: 10, grav: 0.5 },
	dec: { hor: 0.3, air: 0.4 },
	max: { hor: 3, air: 6, ver: 15 },
};

function move(dir, type) {
	var keyDir = DIRECTION_TO_VALUE[dir];
	var horAxis = keyDir.axis;
	var verAxis = DIRECTION_TO_VALUE["up"].axis;

	Body.setVelocity(player, {
		[horAxis]: player.velocity[horAxis] + keyDir.sign * PARAMETERS.acc[type],
		[verAxis]: player.velocity[verAxis],
	});
}

function jump() {
	var keyDir = DIRECTION_TO_VALUE["up"];
	var verAxis = keyDir.axis;
	var horAxis = DIRECTION_TO_VALUE["right"].axis;

	Body.setVelocity(player, {
		[horAxis]: player.velocity[horAxis],
		[verAxis]: player.velocity[verAxis] + keyDir.sign * PARAMETERS.acc.jump,
	});
}

function fastFall() {
	var keyDir = DIRECTION_TO_VALUE["down"];
	var verAxis = keyDir.axis;
	var horAxis = DIRECTION_TO_VALUE["right"].axis;

	Body.setVelocity(player, {
		[horAxis]: player.velocity[horAxis],
		[verAxis]: player.velocity[verAxis] + keyDir.sign * PARAMETERS.acc.fall,
	});
}

function wallJump(dir) {
	var sideKeyDir = DIRECTION_TO_VALUE[dir];
	var jumpKeyDir = DIRECTION_TO_VALUE["up"];

	Body.setVelocity(player, {
		[sideKeyDir.axis]: sideKeyDir.sign * PARAMETERS.acc.wall,
		[jumpKeyDir.axis]: 0.8 * jumpKeyDir.sign * PARAMETERS.acc.jump,
	});
}

function maxVel(type) {
	var horAxis = DIRECTION_TO_VALUE["right"].axis;
	var verAxis = DIRECTION_TO_VALUE["up"].axis;

	if (player.velocity[horAxis] > PARAMETERS.max[type]) {
		Body.setVelocity(player, { [horAxis]: PARAMETERS.max[type], [verAxis]: player.velocity[verAxis] });
	}
	if (player.velocity[horAxis] < -PARAMETERS.max[type]) {
		Body.setVelocity(player, { [horAxis]: -PARAMETERS.max[type], [verAxis]: player.velocity[verAxis] });
	}
	if (player.velocity[verAxis] > PARAMETERS.max.ver) {
		Body.setVelocity(player, { [horAxis]: player.velocity[horAxis], [verAxis]: PARAMETERS.max.ver });
	}
	if (player.velocity[verAxis] < -PARAMETERS.max.ver) {
		Body.setVelocity(player, { [horAxis]: player.velocity[horAxis], [verAxis]: -PARAMETERS.max.ver });
	}
}

function decel(type) {
	var horAxis = DIRECTION_TO_VALUE["right"].axis;
	var verAxis = DIRECTION_TO_VALUE["up"].axis;

	if (player.velocity[horAxis] > 0) {
		Body.setVelocity(player, {
			[horAxis]: player.velocity[horAxis] - PARAMETERS.dec[type],
			[verAxis]: player.velocity[verAxis],
		});
	} else if (player.velocity[horAxis] < 0) {
		Body.setVelocity(player, {
			[horAxis]: player.velocity[horAxis] + PARAMETERS.dec[type],
			[verAxis]: player.velocity[verAxis],
		});
	}

	if (-0.5 <= player.velocity[horAxis] && player.velocity[horAxis] <= 0.5) {
		Body.setVelocity(player, { [horAxis]: 0, [verAxis]: player.velocity[verAxis] });
	}
}

function cancelVel(axis) {
	switch (axis) {
		case "x":
			Body.setVelocity(player, { x: 0, y: player.velocity.y });
			break;
		case "y":
			Body.setVelocity(player, { x: player.velocity.x, y: 0 });
			break;
	}
}

var particles = [];
function death() {
	_isAlive = false;
	engine.timing.timeScale = 0.075;
	Composite.remove(engine.world, player);
	let particle;
	particles = [];

	for (let i = 0; i < 50; i++) {
		particle = Bodies.rectangle(player.position.x, player.position.y, 8, 8, {
			friction: 0.1,
			frictionAir: 0.004,
			frictionStatic: 0,
		});
		Body.setVelocity(particle, {
			x: Math.random() * 25 * (-1) ** Math.floor(2 * Math.random()),
			y: Math.random() * 25 * (-1) ** Math.floor(2 * Math.random()),
		});
		particles.push(particle);
	}
	Composite.add(engine.world, particles);
}

function respawn(spawnpoint = { x: 640, y: 100 }, defaultGravDir = "down") {
	_isAlive = true;
	respawnTimer = 0;

	Composite.remove(engine.world, particles);
	// console.log("attempted to clear particles");

	Body.setPosition(player, spawnpoint);
	Composite.add(engine.world, player);

	changeGrav(defaultGravDir);
	console.log("changed grav maybe");

	for (const fallPlat of FALLING_PLATFORMS) {
		fallPlat.reset();
	}

	for (const fallSpike of FALLING_SPIKES) {
		fallSpike.reset();
	}
}
