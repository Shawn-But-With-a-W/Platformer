var Bodies = Matter.Bodies;

var player = Bodies.rectangle(640, 0, 40, 40, {friction : 0, frictionAir : 0, frictionStatic : 0});
player.render.fillStyle = "#f5d259";
player.timeScale = 1;

var floor = Bodies.rectangle(640, 650, 1280, 30, {isStatic: true});
var ceiling = Bodies.rectangle(640, 0, 1280, 30, {isStatic: true});
var wallLeft = Bodies.rectangle(0, 325, 30, 720, {isStatic : true});
var wallRight = Bodies.rectangle(1280, 325, 30, 720, {isStatic : true});

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


function isOnGround() {
    var _onGround = false;
    for (let ground of OBSTACLES.down) {
        if (Collision.collides(player, ground) != null) {
            _onGround = true;
            break
        }
    }
    return _onGround
}

function isOnCeiling() {
    var _onCeiling = false;
    for (let ceiling of OBSTACLES.up) {
        if (Collision.collides(player, ceiling) != null) {
            _onCeiling = true;
            break
        }
    }
    return _onCeiling
}

function isOnLeftWall() {
    var _onLeftWall = false;
    for (let leftWall of OBSTACLES.left) {
        if (Collision.collides(player, leftWall) != null) {
            _onLeftWall = true;
            break
        }
    }
    return _onLeftWall
}

function isOnRightWall() {
    var _onRightWall = false;
    for (let rightWall of OBSTACLES.right) {
        if (Collision.collides(player, rightWall) != null) {
            _onRightWall = true;
            break
        }
    }
    return _onRightWall
}


function isOnUpObst() {
    var _onUpObst = false;
    for (let upObst of UPOBST) {
        if (Collision.collides(player, upObst) != null) {
            _onUpObst = true;
            break
        }
    }
    return _onUpObst
}

function isOnDownObst() {
    var _onDownObst = false;
    for (let downObst of DOWNOBST) {
        if (Collision.collides(player, downObst) != null) {
            _onDownObst = true;
            break
        }
    }
    return _onDownObst
}

function isOnLeftObst() {
    var _onLeftObst = false;
    for (let leftObst of LEFTOBST) {
        if (Collision.collides(player, leftObst) != null) {
            _onLeftObst = true;
            break
        }
    }
    return _onLeftObst
}

function isOnRightObst() {
    var _onRightObst = false;
    for (let rightObst of RIGHTOBST) {
        if (Collision.collides(player, rightObst) != null) {
            _onRightObst = true;
            break
        }
    }
    return _onRightObst
}