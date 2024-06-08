// Module aliases
var Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Body = Matter.Body,
	Bounds = Matter.Bounds,
	Composite = Matter.Composite,
	Collision = Matter.Collision,
	Mouse = Matter.Mouse,
	MouseConstraint = Matter.MouseConstraint;

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

function screenShake(t, type) {
	switch (type) {
		case "death":
			if (t <= 30) {
				Bounds.translate(render.bounds, {
					x: ((30 - t) / 5) * Math.sin(((2 * Math.PI) / 10) * t),
					y: ((30 - t) / 5) * Math.sin(((2 * Math.PI) / 10) * (t - 1)),
				});
			} else {
				tween(t - 30, 5, currentLevel.max.x - render.bounds.max.x, currentLevel.max.y - render.bounds.max.y);

				render.bounds.min.x = currentLevel.min.x;
				render.bounds.min.y = currentLevel.min.y;
				render.bounds.max.x = currentLevel.max.x;
				render.bounds.max.y = currentLevel.max.y;
			}

			break;

		default:
			break;
	}
}

function tween(t, tMax, xDisp, yDisp, fn) {
	// Jarrett wrote this
	if (t <= tMax) {
		const pos = typeof fn === "function" ? fn(t / tMax) : t / tMax;
		render.bounds.min.x = lmx + xDisp * pos;
		render.bounds.min.y = lmy + yDisp * pos;
		render.bounds.max.x = lxx + xDisp * pos;
		render.bounds.max.y = lxy + yDisp * pos;
		// console.log(render.bounds);
	} else {
		render.bounds.min.x = currentLevel.min.x;
		render.bounds.min.y = currentLevel.min.y;
		render.bounds.max.x = currentLevel.max.x;
		render.bounds.max.y = currentLevel.max.y;
	}
}

function easeInOutSine(t) {
	return -(Math.cos(Math.PI * t) - 1) / 2;
}
