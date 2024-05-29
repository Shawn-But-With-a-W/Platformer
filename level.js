const LEVELS  = [new Level(0, 0, 1280, 650, {x:640, y:100}, [{x:-100, y:-100}])];
var levelIndex = 0;
var currentLevel = LEVELS[levelIndex]

class Level {
    constructor(xMin, yMin, xMax, yMax, start, ends) {
        this.xMax = xMax;
        this.xMin = xMin;
        this.yMax = yMax;
        this.yMin = yMin;
        this.start = start;
        this.end = ends;

        this.spawn = start;
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


    levelComplete() {
        for (let end of this.ends) {
            if ((end.x-10 <= player.position.x <= end.x+10) || (end.y-10 <= player.position.y <= end.y+10)) {
                return end.index;
            }
        }
    }
}