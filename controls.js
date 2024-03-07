// Record of whether a direction key is currently being pressed
var keysPressed = {"ArrowUp" : false, "ArrowDown" : false,  "ArrowLeft" : false, "ArrowRight" : false};
var directionsPressed = {"up" : false, "down" : false, "left" : false, "right" : false };

// Change the key's corresponding value (get it?) to be true when pressed
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            keysPressed["ArrowUp"] = true;
            break;
        case "ArrowDown":
            keysPressed["ArrowDown"] = true;
            break;
        case "ArrowRight":
            keysPressed["ArrowRight"] = true;
            break;
        case "ArrowLeft":
            keysPressed["ArrowLeft"] = true;
            break
        case "w":
            engine.gravity = {x : 0, y : -1};
            gravDir = "up";
            break
        case "W":
            engine.gravity = {x : 0, y : -1};
            gravDir = "up";
            break
        case "a":
            engine.gravity = {x : -1, y : 0};
            gravDir = "left";
            break
        case "A":
            engine.gravity = {x : -1, y : 0};
            gravDir = "left";
            break
        case "s":
            engine.gravity = {x : 0, y : 1};
            gravDir = "down";
            break
        case "S":
            engine.gravity = {x : 0, y : 1};
            gravDir = "down";
            break
        case "d":
            engine.gravity = {x : 1, y : 0};
            gravDir = "right";
            break
        case "D":
            engine.gravity = {x : 1, y : 0};
            gravDir = "right";
            break
    }
});

// Change the key's corresponding value to be false when released
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowUp":
            keysPressed["ArrowUp"] = false;
            break;
        case "ArrowDown":
            keysPressed["ArrowDown"] = false;
            break;
        case "ArrowRight":
            keysPressed["ArrowRight"] = false;
            break;
        case "ArrowLeft":
            keysPressed["ArrowLeft"] = false;
    }});