const PARAMETERS = {
    acc : { hor : 0.2, air : 0.5, jum : 7, fal : 1.5 , wal : 5 },
    dec : { hor : 0.07, air : 0.05 },
    max : { hor : 3, air : 5, ver : 20},
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
    var horAxis = DIRECTION_TO_VALUE["right"].axis;
    var verAxis = DIRECTION_TO_VALUE["up"].axis;


    if (player.velocity[horAxis] > PARAMETERS.max.hor) {
        Body.setVelocity(player, {[horAxis] : PARAMETERS.max[type], [verAxis] : player.velocity[verAxis]});
    }
    if (player.velocity[horAxis] < -PARAMETERS.max.hor) {
        Body.setVelocity(player, {[horAxis] : -PARAMETERS.max[type], [verAxis] : player.velocity[verAxis]});
    }
    if (player.velocity[verAxis] > PARAMETERS.max.ver) {
        Body.setVelocity(player, {[horAxis] : player.velocity[horAxis], [verAxis] : PARAMETERS.max.ver});
    }
    if (player.velocity[verAxis] < -PARAMETERS.max.ver) {
        Body.setVelocity(player, {[horAxis] : player.velocity[horAxis], [verAxis] : -PARAMETERS.max.ver});
    }
}


function decel(type) {
    var horAxis = DIRECTION_TO_VALUE["right"].axis;
    var verAxis = DIRECTION_TO_VALUE["up"].axis;

    if (player.velocity[horAxis] > 0) {
        Body.setVelocity(player, {[horAxis] : player.velocity[horAxis] - PARAMETERS.dec[type], [verAxis] : player.velocity[verAxis]});
    }
    else if (player.velocity[horAxis] < 0) {
        Body.setVelocity(player, {[horAxis] : player.velocity[horAxis] + PARAMETERS.dec[type], [verAxis] : player.velocity[verAxis]});
    }
}

