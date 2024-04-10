var horAcc = 0.1;
var horDec = 1;
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

function maxVel() {
    if (player.velocity.x > horMax) {
        Body.setVelocity(player, {x : horMax, y : player.velocity.y});
    }
    if (player.velocity.x < -horMax) {
        Body.setVelocity(player, {x : -horMax, y : player.velocity.y});
    }
    if (player.velocity.y > verMax) {
        Body.setVelocity(player, {x : player.velocity.x, y : verMax});
    }
    if (player.velocity.y < -verMax) {
        Body.setVelocity(player, {x : player.velocity.x, y : -verMax});
    }
}

function decel() {
    if (player.velocity.x > 0) {
        Body.setVelocity(player, {x : player.velocity.x - horDec, y : player.velocity.y});
        console.log("plus");
    }
    else if (player.velocity.x < 0) {
        player.velocity.x += horDec;
        console.log("minus");
    }
    else {
        console.log("idk ")
    }

}