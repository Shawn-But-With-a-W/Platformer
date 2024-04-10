var Bodies = Matter.Bodies;

var player = Bodies.rectangle(640, 0, 40, 40, {friction : 0, frictionAir : 0, frictionStatic : 0});
player.render.fillStyle = "#f5d259";
player.timeScale = 1;

var floor = Bodies.rectangle(640, 575, 1280, 30, {isStatic: true});
var ceiling = Bodies.rectangle(640, 0, 1280, 30, {isStatic: true});
var wallLeft = Bodies.rectangle(0, 287, 30, 575, {isStatic : true});
var wallRight = Bodies.rectangle(1280, 287, 30, 575, {isStatic : true});

const UPOBST = [ceiling];
const DOWNOBST = [floor];
const LEFTOBST = [wallLeft];
const RIGHTOBST = [wallRight];

var OBSTACLES = {
    up : UPOBST,
    down : DOWNOBST,
    left : LEFTOBST,
    right : RIGHTOBST,
};
