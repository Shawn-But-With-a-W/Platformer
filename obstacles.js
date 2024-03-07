var Bodies = Matter.Bodies;

var player = Bodies.rectangle(640, 0, 40, 40, {friction : 0, frictionAir : 0, frictionStatic : 0});
player.timeScale = 1;

var floor = Bodies.rectangle(640, 575, 1280, 30, {isStatic: true});
var ceiling = Bodies.rectangle(640, 0, 1280, 30, {isStatic: true});
var wallLeft = Bodies.rectangle(0, 287, 30, 575, {isStatic : true});
var wallRight = Bodies.rectangle(1280, 287, 30, 575, {isStatic : true});

var upObst = [ceiling];
var downObst = [floor];
var leftObst = [wallLeft];
var rightObst = [wallRight];
