// Record of whether a key is currently being pressed
var keysPressed = {"ArrowUp" : false, "ArrowDown" : false, "ArrowRight" : false, "ArrowLeft" : false};

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
    }});

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