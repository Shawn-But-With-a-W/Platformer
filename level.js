class Level {
    constructor(xMin, yMin, xMax, yMax, spawn, start, ends) {
        this.xMax = xMax;
        this.xMin = xMin;
        this.yMax = yMax;
        this.yMin = yMin;
        this.start = start;
        this.ends = ends;

        this.start = start;
        this.spawn = spawn;
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
            if ((end.x-50 <= player.position.x) && (player.position.x <= end.x+50) && (end.y-50 <= player.position.y) && (player.position.y <= end.y+50)) {
                console.log("level ended");
                return end;
            }
            else {
                console.log("end not found");
            }
        }
    }


    nextLevel(end) {
        for (let level of LEVELS) {
            if (level.start == end) {
                return level
            }
        }
    }
}


var LEVELS  = [new Level(0, 0, 1280, 650, {x:640, y:100}, {x:640, y:100}, [{x:0, y:50}])];
var levelIndex = 0;
var currentLevel = LEVELS[levelIndex]