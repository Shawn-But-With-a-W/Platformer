// Initialise gravity
var gravDir = "down";

// Initialise directions

var DIRECTION_TO_VALUE = {
    "up" : { "axis" : "y", "sign" : -1 },
    "down": { "axis" : "y", "sign" : 1 },
    "left" : { "axis" : "x", "sign" : -1 },
    "right" : { "axis" : "x", "sign" : 1 },
}

var KEYSTROKE_TO_DIRECTION = {
    "ArrowUp" : "up",
    "ArrowDown" : "down",
    "ArrowLeft" : "left",
    "ArrowRight" : "right",
}

function changeGrav(gravDir) {
    switch (gravDir) {
        case "down":
            DIRECTION_TO_VALUE = {
                "up" : { "axis" : "y", "sign" : -1 },
                "down": { "axis" : "y", "sign" : 1 },
                "left" : { "axis" : "x", "sign" : -1 },
                "right" : { "axis" : "x", "sign" : 1 },
            }
            KEYSTROKE_TO_DIRECTION = {
                "ArrowUp" : "up",
                "ArrowDown" : "down",
                "ArrowLeft" : "left",
                "ArrowRight" : "right",
            }
            break
        case "up":
            DIRECTION_TO_VALUE = {
                "up" : { "axis" : "y", "sign" : 1 },
                "down": { "axis" : "y", "sign" : -1 },
                "left" : { "axis" : "x", "sign" : -1 },
                "right" : { "axis" : "x", "sign" : 1 },
            }
            KEYSTROKE_TO_DIRECTION = {
                "ArrowUp" : "down",
                "ArrowDown" : "up",
                "ArrowLeft" : "left",
                "ArrowRight" : "right",
            }
            break
        case "left":
            DIRECTION_TO_VALUE = {
                "up" : { "axis" : "x", "sign" : 1 },
                "down": { "axis" : "x", "sign" : -1 },
                "left" : { "axis" : "y", "sign" : -1 },
                "right" : { "axis" : "y", "sign" : 1 },
            }
            KEYSTROKE_TO_DIRECTION = {
                "ArrowUp" : "left",
                "ArrowDown" : "right",
                "ArrowLeft" : "down",
                "ArrowRight" : "up",
            }
            break
        case "right":
            DIRECTION_TO_VALUE = {
                "up" : { "axis" : "x", "sign" : -1 },
                "down": { "axis" : "x", "sign" : 1 },
                "left" : { "axis" : "y", "sign" : 1 },
                "right" : { "axis" : "y", "sign" : -1 },
            }
            KEYSTROKE_TO_DIRECTION = {
                "ArrowUp" : "right",
                "ArrowDown" : "left",
                "ArrowLeft" : "up",
                "ArrowRight" : "down",
            }
            break
    }
}