var horAcc = 0.1;
var horDec = 0.5;
var horMax = 10;

var jumpAcc = 5;
var fallAcc = 5;
var verMax = 20;
var grav = 9.8;



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