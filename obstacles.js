var Bodies = Matter.Bodies;

var player = Bodies.rectangle(640, 0, 40, 40, {friction : 0, frictionAir : 0, frictionStatic : 0, inertia : Infinity});
player.render.fillStyle = "#f5d259";
player.timeScale = 1;

var floor = Bodies.rectangle(640, 650, 1280, 30, {isStatic: true});
var ceiling = Bodies.rectangle(640, 0, 1280, 30, {isStatic: true});
var wallLeft = Bodies.rectangle(0, 325, 30, 720, {isStatic : true});
var wallRight = Bodies.rectangle(1280, 325, 30, 720, {isStatic : true});

var UPOBST = [ceiling];
var DOWNOBST = [floor];
var LEFTOBST = [wallLeft];
var RIGHTOBST = [wallRight];
var PLATOFORMS = [];
var SPIKES = [];

var OBSTACLES = {
    up : UPOBST,
    down : DOWNOBST,
    left : LEFTOBST,
    right : RIGHTOBST,
};


// add all of the bodies to the world
Composite.add(engine.world, [player, floor, ceiling, wallLeft, wallRight]);

class Platform {
    constructor(x, y, width, height) { // TODO: add default values for dimensions
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxX = this.x + this.width/2;
        this.minX = this.x - this.width/2;
        this.maxY = this.y + this.height/2;
        this.minY = this.y - this.height/2;
        
        // Trace out the platform with 4 individual rectangles
        this.top = Bodies.rectangle(this.x, this.minY, width, 2, {isStatic : true});
        this.bottom = Bodies.rectangle(this.x, this.maxY, width, 2, {isStatic : true});
        this.left = Bodies.rectangle(this.minX, y, 2, height, {isStatic : true});
        this.right = Bodies.rectangle(this.maxX, y, 2, height, {isStatic : true});

        Matter.Composite.add(engine.world, [this.top, this.bottom, this.left, this.right]);

        // Update obstacles
        UPOBST.push(this.bottom);
        DOWNOBST.push(this.top);
        LEFTOBST.push(this.right);
        RIGHTOBST.push(this.left);

        changeGrav(gravDir);

        PLATOFORMS.push(this);
    }
}

var testPlatform = new Platform(500, 500, 100, 50);