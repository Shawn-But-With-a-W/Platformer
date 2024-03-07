var PARAMETERS = {
    acc : { hor : 0.2, air : 0.5, jum : 7, fal : 1.5 , wal : 5 },
    dec : { hor : 0.07, air : 0.05 },
    max : { hor : 3, air : 5, ver : 15},
}

function move(dir,  type) {
    switch (dir) {
        case "right":
            Body.setVelocity(player, {x : player.velocity.x + PARAMETERS.acc[type], y : player.velocity.y});
            break
        case "left":
            Body.setVelocity(player, {x : player.velocity.x - PARAMETERS.acc[type], y : player.velocity.y});
    }
}

function jump() {
    Body.setVelocity(player, {x : player.velocity.x, y : player.velocity.y - PARAMETERS.acc.jum});
}

function fastFall() {
    Body.setVelocity(player, {x : player.velocity.x, y : player.velocity.y + PARAMETERS.acc.fal});
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
    if (player.velocity.x > 0) {
        Body.setVelocity(player, {x : player.velocity.x - PARAMETERS.dec[type], y : player.velocity.y});
    }
    else if (player.velocity.x < 0) {
        Body.setVelocity(player, {x : player.velocity.x + PARAMETERS.dec[type], y : player.velocity.y})
    }
}

function wallJump(dir) {
    if (dir == "left") {
        Body.setVelocity(player, {x : player.velocity.x - PARAMETERS.acc.wal , y : player.velocity.y - PARAMETERS.acc.jum});
    }
    else if (dir == "right") {
        Body.setVelocity(player, {x : player.velocity.x + PARAMETERS.acc.wal , y : player.velocity.y - PARAMETERS.acc.jum});
    }
}