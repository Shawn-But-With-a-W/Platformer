// Module aliases
var Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Body = Matter.Body,
	Bounds = Matter.Bounds,
	Composite = Matter.Composite,
	Collision = Matter.Collision,
	Mouse = Matter.Mouse,
	MouseConstraint = Matter.MouseConstraint,
	Events = Matter.Events;

// Create an engine
var engine = Engine.create();

// Create a renderer
var render = Render.create({
	canvas: document.getElementById("game-screen"),
	engine: engine,
	options: {
		width: 1280,
		height: 650,
		background: "#b5b5b5",
		pixelRatio: "auto",
		wireframes: false,
		hasBounds: true,
		showDebug: true,
		// showAngleIndicator : true,
		// showAxes : true,
		// showBounds : true,
		// showCollisions : true,
		// showIds : true,
		// showPositions : true,
		// showVelocity : true,
	},
});

// Run the renderer
Render.run(render);

function screenShakeDeath(t) {
	if (t <= 30) {
		Bounds.translate(render.bounds, {
			x: ((30 - t) / 4) * Math.sin(((2 * Math.PI) / 7) * t),
			y: ((30 - t) / 4) * Math.sin(((2 * Math.PI) / 7) * (t - 1)),
		});
	} else {
		tween(t - 30, 2, currentLevel.max.x - render.bounds.max.x, currentLevel.max.y - render.bounds.max.y);

		// render.bounds.min.x = currentLevel.min.x;
		// render.bounds.min.y = currentLevel.min.y;
		// render.bounds.max.x = currentLevel.max.x;
		// render.bounds.max.y = currentLevel.max.y;
	}
}

function screenShakeGrav(t, dir) {
	if (t <= 2) {
		switch (dir) {
			case "up":
				Bounds.translate(render.bounds, {
					x: 0,
					y: -0.5,
				});
				break;
			case "down":
				Bounds.translate(render.bounds, {
					x: 0,
					y: 0.5,
				});
				break;
			case "left":
				Bounds.translate(render.bounds, {
					x: -0.5,
					y: 0,
				});
				break;
			case "right":
				Bounds.translate(render.bounds, {
					x: 0.5,
					y: 0,
				});
				break;
		}
	} else {
		if (!_boundsSet) {
			setBounds();
		}
		// console.log(currentLevel.max.x - lxx, currentLevel.max.y - lxy);
		// console.log("I was here");
		// console.log(currentLevel.max.x, currentLevel.max.y);
		console.log(_boundsSet, lxx, lxy, currentLevel.max.x, currentLevel.max.y);
		tween(t - 8, 4, currentLevel.max.x - lxx, currentLevel.max.y - lxy);
	}
}

function tween(t, tMax, xDisp, yDisp, fn) {
	// Jarrett wrote this
	// console.log(t, tMax);
	if (t <= tMax) {
		const pos = typeof fn === "function" ? fn(t / tMax) : t / tMax;
		render.bounds.min.x = lmx + xDisp * pos;
		render.bounds.min.y = lmy + yDisp * pos;
		render.bounds.max.x = lxx + xDisp * pos;
		render.bounds.max.y = lxy + yDisp * pos;
		// console.log(xDisp, yDisp);
		// console.log(render.bounds);
	} else {
		render.bounds.min.x = currentLevel.min.x;
		render.bounds.min.y = currentLevel.min.y;
		render.bounds.max.x = currentLevel.max.x;
		render.bounds.max.y = currentLevel.max.y;
		_boundsSet = false;
		console.log(_boundsSet);
		// setBounds();
	}
}

function setBounds() {
	({
		min: { x: lmx, y: lmy },
		max: { x: lxx, y: lxy },
	} = render.bounds);
	_boundsSet = true;
	// console.log("bound set");
}

function easeInOutSine(t) {
	return -(Math.cos(Math.PI * t) - 1) / 2;
}
