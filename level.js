class Level {
    constructor(min, max, spawn, start, ends) {
        this.min = min;
        this.max = max;
        this.spawn = spawn;
        this.start = start;
        this.ends = ends;

        this.xMin = min.x;
        this.xMax = max.x;
        this.yMin = min.y;
        this.yMax = max.y;
    }


    getSpawn() {
        return this.spawn;
    }


    changeSpawn(newSpawn) {
        this.spawn = newSpawn;
        this.getSpawn();
    }


    isOutOfBounds() {
        if ((player.position.x > xMax) || (player.position.x < xMin) || (player.position.y > yMax) || (player.position.y < yMin)) {
            return true;
        }
        else {
            return false;
        }
    }


    checkLevelComplete() {
        for (let end of this.ends) {
            if ((end.x-75 <= player.position.x) && (player.position.x <= end.x+75) && (end.y-75 <= player.position.y) && (player.position.y <= end.y+75)) {
                console.log("level ended");
                return end;
            }
            else {
                console.log("end not found");
            }
        }
        return false;
    }


    nextLevel(end) {
        return LEVELS[end.next];
    }
}


var LEVELS  = [
    new Level({x:0, y:0}, {x:1280, y:650}, {x:640, y:100}, {x:640, y:100}, [{x:0, y:50, next:1}]),
    new Level({x:-1080, y:-450}, {x:200, y:200}, {x:0, y:0}, {x:100, y:50}, [{x:999, y:999, next:0}]),
];
var levelIndex = 0;
var currentLevel = LEVELS[levelIndex]