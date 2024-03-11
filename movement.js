var PARAMETERS = {
    acc : { hor : 0.2, air : 0.5, jum : 7, fal : 1.5 , wal : 5 },
    dec : { hor : 0.07, air : 0.05 },
    max : { hor : 3, air : 5, ver : 15},
}

function move(dir,  type) {
    var keyDir = DIRECTION_TO_VALUE[dir];

    console.log("move", dir);

    if (keyDir.axis == "x") {
        Body.setVelocity(player, { x : player.velocity.x + keyDir.sign*PARAMETERS.acc[type], y : player.velocity.y });
    }
    else if (keyDir.axis == "y") {
        Body.setVelocity(player, { x : player.velocity.x , y : player.velocity.y + keyDir.sign*PARAMETERS.acc[type] });
    }
}

function jump() {
    var keyDir = DIRECTION_TO_VALUE["up"];

    console.log("jump");

    if (keyDir.axis == "x") {
        Body.setVelocity(player, { x : player.velocity.x + keyDir.sign*PARAMETERS.acc.jum, y : player.velocity.y });
    }
    else if (keyDir.axis == "y") {
        Body.setVelocity(player, { x : player.velocity.x, y : player.velocity.y + keyDir.sign*PARAMETERS.acc.jum });
    }

}

function fastFall() {
    var keyDir = DIRECTION_TO_VALUE["down"];

    console.log("fall");

    if (keyDir.axis == "x") {
        Body.setVelocity(player, { x : player.velocity.x + keyDir.sign*PARAMETERS.acc.fal, y : player.velocity.y });
    }
    else if (keyDir.axis == "y") {
        Body.setVelocity(player, {x : player.velocity.x, y : player.velocity.y + keyDir.sign*PARAMETERS.acc.fal});
    }
}

function wallJump(dir) {
    var sideKeyDir = DIRECTION_TO_VALUE[dir];
    var jumpKeyDir = DIRECTION_TO_VALUE["up"];

    console.log("walljump");

    if (jumpKeyDir.axis == "x") {
        Body.setVelocity(player, { x : player.velocity.x + jumpKeyDir.sign*PARAMETERS.acc.jum, y : player.velocity.y });
    }
    else if (jumpKeyDir.axis == "y") {
        Body.setVelocity(player, { x : player.velocity.x, y : player.velocity.y + jumpKeyDir.sign*PARAMETERS.acc.jum });
    }

    if (sideKeyDir.axis == "x") {
        Body.setVelocity(player, { x : player.velocity.x + sideKeyDir.sign*PARAMETERS.acc.wal, y : player.velocity.y });
    }
    else if (sideKeyDir.axis == "y") {
        Body.setVelocity(player, { x : player.velocity.x , y : player.velocity.y + sideKeyDir.sign*PARAMETERS.acc.wal });
    }
}

function maxVel(type) {
    if (player.velocity.x > PARAMETERS.max.hor) {
        Body.setVelocity(player, {x : PARAMETERS.max[type], y : player.velocity.y});
    }
    if (player.velocity.x < -PARAMETERS.max.hor) {
        Body.setVelocity(player, {x : -PARAMETERS.max[type], y : player.velocity.y});
    }
    if (player.velocity.y > PARAMETERS.max.ver) {
        Body.setVelocity(player, {x : player.velocity.x, y : PARAMETERS.max.ver});
    }
    if (player.velocity.y < -PARAMETERS.max.ver) {
        Body.setVelocity(player, {x : player.velocity.x, y : -PARAMETERS.max.ver});
    }
}

function decel(type) {
    var horAxis = DIRECTION_TO_VALUE["right"].axis

    if (horAxis == "x") {
        if (player.velocity.x > 0) {
            Body.setVelocity(player, {x : player.velocity.x - PARAMETERS.dec[type], y : player.velocity.y});
        }
        else if (player.velocity.x < 0) {
            Body.setVelocity(player, {x : player.velocity.x + PARAMETERS.dec[type], y : player.velocity.y});
        }}
    else if (horAxis == "y") {
        if (player.velocity.y > 0) {
            Body.setVelocity(player, {x : player.velocity.x, y : player.velocity.y - PARAMETERS.dec[type]});
        }
        if (player.velocity.y < 0) {
            Body.setVelocity(player, {x : player.velocity.x, y : player.velocity.y + PARAMETERS.dec[type]});
        }}
}

