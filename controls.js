// Record of whether a direction key is currently being pressed
var keysPressed = {"ArrowUp" : false, "ArrowDown" : false,  "ArrowLeft" : false, "ArrowRight" : false};
var directionsPressed = {"up" : false, "down" : false, "left" : false, "right" : false };

// Change the key's corresponding value (get it?) to be true when pressed
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        // Switch fallthrough (weird syntax I know)
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowRight":
        case "ArrowLeft":
            keysPressed[event.key] = true;
            directionsPressed[KEYSTROKE_TO_DIRECTION[event.key]] = true;
            break
        
        case "w":
        case "W":
            engine.gravity = {x : 0, y : -1};
            gravDir = "up";
            break
        case "a":
        case "A":
            engine.gravity = {x : -1, y : 0};
            gravDir = "left";
            break
        case "s":
        case "S":
            engine.gravity = {x : 0, y : 1};
            gravDir = "down";
            break
        case "d":
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
        case "ArrowDown":
        case "ArrowRight":
        case "ArrowLeft":
            keysPressed[event.key] = false;
            directionsPressed[KEYSTROKE_TO_DIRECTION[event.key]] = false;
            break
    }});