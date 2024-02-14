var horAcc = 0.1;
var horDec = 0.5;
var horMax = 10;

var jumpAcc = 7;
var fallAcc = 2;
var verMax = 15;



function move(dir) {
    switch (dir) {
        case "right":
            Body.setVelocity(player, {x : player.velocity.x + horAcc, y : player.velocity.y});
            break
        case "left":
            Body.setVelocity(player, {x : player.velocity.x - horAcc, y : player.velocity.y});
            break
    }
}

function jump() {
    Body.setVelocity(player, {x : player.velocity.x, y : player.velocity.y - jumpAcc});
}

function fastFall() {
    Body.setVelocity(player, {x : player.velocity.x, y : player.velocity.y + fallAcc});
}