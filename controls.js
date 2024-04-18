// Record of whether a direction key is currently being pressed
var keysPressed = { "ArrowUp" : false, "ArrowDown" : false,  "ArrowLeft" : false, "ArrowRight" : false };
var directionsPressed = { "up" : false, "down" : false, "left" : false, "right" : false };
var gravPressed = { "W" : false, "A" : false, "S" : false, "D" : false };

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
        
        case "W":
        case "A":
        case "S":
        case "D":
            gravPressed[event.key] = true;
            break

        case "w":
        case "a":
        case "s":
        case "d":
            gravPressed[event.key.toUpperCase()] = true;
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


function neutral() {
    keysPressed = { "ArrowUp" : false, "ArrowDown" : false,  "ArrowLeft" : false, "ArrowRight" : false };
    directionsPressed = { "up" : false, "down" : false, "left" : false, "right" : false };
    gravPressed = { "W" : false, "A" : false, "S" : false, "D" : false };
}


function isNeutral() {
    var directions = Object.keys(directionsPressed);
    var _isNeutral = true;

    for (let direction of directions) {
        if (directionsPressed[direction] == true) {
            _isNeutral = false;
            break
        }
    }

    return _isNeutral
}