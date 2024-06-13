var Bodies = Matter.Bodies;

var player = Bodies.rectangle(640, 0, 40, 40, {
	friction: 0,
	frictionAir: 0,
	frictionStatic: 0,
	inertia: Infinity,
});
player.render.fillStyle = "#f5d259";
player.render.lineWidth = 2;
player.timeScale = 1;

var floor = Bodies.rectangle(640, 650, 1280, 30, { isStatic: true });
var ceiling = Bodies.rectangle(640, 0, 1280, 30, { isStatic: true });
var wallLeft = Bodies.rectangle(0, 500, 30, 720, { isStatic: true });
var wallRight = Bodies.rectangle(1280, 325, 30, 720, { isStatic: true });

var room1Floor = Bodies.rectangle(-640, 200, 1280, 30, { isStatic: true });
var room1Ceiling;
var room1WallLeft = Bodies.rectangle(-1000, 200, 30, 500, { isStatic: true });
var room1WallRight;

var UPOBST = [ceiling];
var DOWNOBST = [floor, room1Floor];
var LEFTOBST = [wallLeft, room1WallLeft];
var RIGHTOBST = [wallRight];
var PLATFORMS = [];
var SPIKES = [];

var OBSTACLES = {
	up: UPOBST,
	down: DOWNOBST,
	left: LEFTOBST,
	right: RIGHTOBST,
};

// add all of the bodies to the world
Composite.add(engine.world, player);
Composite.add(engine.world, UPOBST);
Composite.add(engine.world, DOWNOBST);
Composite.add(engine.world, LEFTOBST);
Composite.add(engine.world, RIGHTOBST);

class Platform {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.maxX = this.x + this.width / 2;
		this.minX = this.x - this.width / 2;
		this.maxY = this.y + this.height / 2;
		this.minY = this.y - this.height / 2;

		// Trace out the platform with 4 individual rectangles
		this.top = Bodies.rectangle(this.x, this.minY, width, 2, {
			isStatic: true,
		});
		this.bottom = Bodies.rectangle(this.x, this.maxY, width, 2, {
			isStatic: true,
		});
		this.left = Bodies.rectangle(this.minX, y, 2, height, {
			isStatic: true,
		});
		this.right = Bodies.rectangle(this.maxX, y, 2, height, {
			isStatic: true,
		});

		Matter.Composite.add(engine.world, [this.top, this.bottom, this.left, this.right]);

		// Update obstacles
		UPOBST.push(this.bottom);
		DOWNOBST.push(this.top);
		LEFTOBST.push(this.right);
		RIGHTOBST.push(this.left);

		changeGrav(gravDir);

		PLATFORMS.push(this);
	}
}

var testPlatform = new Platform(500, 500, 100, 50);

class Spike {
	constructor(start, end, dir, axis) {
		this.radius = 20;
		this.dir = dir;
		this.start = start;
		this.end = end;
		this.axis = axis;
		this.spikes = [];

		// Angles obtained through trial and error
		const DIRECTION_TO_ANGLE = {
			up: (-1 / 6) * Math.PI,
			down: (1 / 6) * Math.PI,
			left: 0,
			right: Math.PI,
		};

		// Only designed for spikes to be horizontally or vertically spread out
		for (let i = this.start[axis]; i < this.end[axis]; i += this.radius * 2) {
			// Check axis to repeat in
			if (this.axis == "x") {
				var spike = Bodies.polygon(i, this.start.y, 3, this.radius, {
					isStatic: true,
					angle: DIRECTION_TO_ANGLE[this.dir],
				});
			} else if (this.axis == "y") {
				var spike = Bodies.polygon(this.start.x, i, 3, this.radius, {
					isStatic: true,
					angle: DIRECTION_TO_ANGLE[this.dir],
				});
			}

			this.spikes.push(spike);
		}

		Composite.add(engine.world, this.spikes);
		SPIKES.push(this);
	}

	// Checking if the player hits the spikes
	hitSpikes() {
		var _hitSpikes = false;
		for (const spike of this.spikes) {
			if (Collision.collides(player, spike) != null) {
				_hitSpikes = true;
				break;
			}
		}
		return _hitSpikes;
	}
}

var testSpike = new Spike({ x: 750, y: 500 }, { x: 1000, y: 500 }, "up", "x");

class Transitioner {
	constructor(x, y, width, height, colour = "#ff5733") {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.create(colour);
	}

	create(colour) {
		this.transitioner = Bodies.rectangle(this.x, this.y, this.width, this.height, {
			isSensor: true,
			isStatic: true,
		});
		Composite.add(engine.world, this.transitioner);
		this.transitioner.render.fillStyle = colour;
	}

	remove() {
		// console.log(this.transitioner);
		this.transitioner.render.fillStyle = "#71aff8";
		Composite.remove(engine.world, this.transitioner);
		// console.log("attempted to remove");
	}

	checkCollision() {
		if (this.transitioner && Collision.collides(player, this.transitioner) !== null) {
			// console.log("true");
			return true;
		} else {
			// console.log("false");
			return false;
		}
	}
}

var transitioner = new Transitioner(-20, 75, 25, 100);
transitioner.create();

var existentTransitioner = new Transitioner(50, 75, 25, 100);
existentTransitioner.create("#71aff8");

// console.log(transitioner);
