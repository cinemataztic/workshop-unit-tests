// should move the position each round 5 or less units to the goal { x: 0, y: 50}
// starts at { -99, -99 }
// return line is added as javascript is untyped :(
function aim(currentX, currentY) {

    x = currentX;
    y = currentY;
    targetX = 0;
    targetY = 50;
    shoot = false;
    moveUnits = 5;

    // moveX
    distX = Math.abs(targetX - x);
    if (x < targetX) {

        if (distX < moveUnits) {
            x = x + distX;
            moveUnits = moveUnits - distX;
        }
        else {
            x = x + moveUnits;
            moveUnits = 0;
        }
    }

    if (x > targetX) {
        if (distX < moveUnits) {
            x = x - distX;
            moveUnits = moveUnits - distX;
        }
        else {
            x = x - moveUnits;
            moveUnits = 0;
        }
    }

    // moveY
    distY = Math.abs(targetY - y);
    if (y < targetY) {
        if (distY < moveUnits) {
            y = y + distY;
            moveUnits = moveUnits - distY;
        }
        else {
            y = y + moveUnits;
            moveUnits = 0;
        }
    }

    if (y > targetY) {
        if (distY < moveUnits) {
            y = y - distY;
            moveUnits = moveUnits - distY;
        }
        else {
            y = y - moveUnits;
            moveUnits = 0;
        }
    }

    // shoot
    if (x === targetX && y === targetY) {
        shoot = true
    }

    return { x, y, shoot }
}


//exports this method
module.exports = { aim };