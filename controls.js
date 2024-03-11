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
            changeGrav("up");
            break
        case "a":
        case "A":
            changeGrav("left");
            break
        case "s":
        case "S":
            changeGrav("down");
            break
        case "d":
        case "D":
            changeGrav("right");
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