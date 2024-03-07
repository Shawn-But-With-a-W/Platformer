// Initialise gravity
var gravDir = "down";

// Initialise directions

var DIRECTIONS = {
    "up" : { "axis" : "y", "sign" : -1 },
    "down": { "axis" : "y", "sign" : 1 },
    "left" : { "axis" : "x", "sign" : -1 },
    "right" : { "axis" : "x", "sign" : 1 },
}

function changeGrav(gravDir) {
    switch (gravDir) {
        case "down":
            DIRECTIONS = {
                "up" : { "axis" : "y", "sign" : -1 },
                "down": { "axis" : "y", "sign" : 1 },
                "left" : { "axis" : "x", "sign" : -1 },
                "right" : { "axis" : "x", "sign" : 1 },
            }
            break
        case "up":
            DIRECTIONS = {
                "up" : { "axis" : "y", "sign" : 1 },
                "down": { "axis" : "y", "sign" : -1 },
                "left" : { "axis" : "x", "sign" : -1 },
                "right" : { "axis" : "x", "sign" : 1 },
            }
            break
        case "left":
            DIRECTIONS = {
                "up" : { "axis" : "x", "sign" : 1 },
                "down": { "axis" : "x", "sign" : -1 },
                "left" : { "axis" : "y", "sign" : -1 },
                "right" : { "axis" : "y", "sign" : 1 },
            }
            break
        case "right":
            DIRECTIONS = {
                "up" : { "axis" : "x", "sign" : -1 },
                "down": { "axis" : "x", "sign" : 1 },
                "left" : { "axis" : "y", "sign" : 1 },
                "right" : { "axis" : "y", "sign" : -1 },
            }
            break
    }
}