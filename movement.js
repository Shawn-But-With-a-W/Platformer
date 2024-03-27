const PARAMETERS = {
    acc : { hor : 0.2, air : 0.5, jum : 7, fal : 1.5 , wal : 5 },
    dec : { hor : 0.07, air : 0.05 },
    max : { hor : 3, air : 5, ver : 20},
}


function move(dir,  type) {
    var keyDir = DIRECTION_TO_VALUE[dir];
    var horAxis = keyDir.axis;
    var verAxis = DIRECTION_TO_VALUE["up"].axis;

    Body.setVelocity(player, { [horAxis] : player.velocity[horAxis] + keyDir.sign*PARAMETERS.acc[type], [verAxis] : player.velocity[verAxis] });
}


function jump() {
    var keyDir = DIRECTION_TO_VALUE["up"];
    var verAxis = keyDir.axis;
    var horAxis = DIRECTION_TO_VALUE["right"].axis;

    Body.setVelocity(player, { [horAxis] : player.velocity[horAxis], [verAxis] : player.velocity[verAxis] + keyDir.sign*PARAMETERS.acc.jum });
}


function fastFall() {
    var keyDir = DIRECTION_TO_VALUE["down"];
    var verAxis = keyDir.axis;
    var horAxis = DIRECTION_TO_VALUE["right"].axis;

    Body.setVelocity(player, { [horAxis] : player.velocity[horAxis], [verAxis] : player.velocity[verAxis] + keyDir.sign*PARAMETERS.acc.fal });
}


function wallJump(dir) {
    var sideKeyDir = DIRECTION_TO_VALUE[dir];
    var jumpKeyDir = DIRECTION_TO_VALUE["up"];

    Body.setVelocity(player, { [sideKeyDir.axis] : player.velocity[sideKeyDir.axis] + sideKeyDir.sign*PARAMETERS.acc.wal, [jumpKeyDir.axis] : player.velocity[jumpKeyDir.axis] + jumpKeyDir.sign*PARAMETERS.acc.jum });
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

