// should move the position each round 5 or less units to the goal { x: 0, y: 50}
// starts at { -99, -99 }
// return line is added as javascript is untyped :(

function difference(a, b) {
    return Math.abs(a - b);
}

function getMoves(totalMoves, requiredMoves) {
    if (totalMoves === 0) {
        return {
            remainingMoves: 0,
            move: 0,
        };
    }
    let leftMoves = totalMoves - requiredMoves;
    //if total moves is less than required moves then return total moves
    if (leftMoves >= 0) {
        return {
            remainingMoves: leftMoves,
            move: requiredMoves,
        };
    } else {
        let counter = 1;
        let requiredMovesTemp = requiredMoves;
        let leftMovesTemp = 0;
        while (leftMovesTemp >= 0) {
            leftMoves > 0 ? counter++ : counter--;
            leftMoves > 0 ? requiredMovesTemp-- : requiredMovesTemp++;
            if (leftMoves > 0) {

                leftMovesTemp = totalMoves + requiredMovesTemp;
            } else {

                leftMovesTemp = totalMoves - requiredMovesTemp;
            }
        }
        return {
            remainingMoves: leftMoves > 0 ? totalMoves - counter : 0,
            move: leftMoves > 0 ? counter : totalMoves - counter,
        };
    }
}
function aim(currentX, currentY) {
    x = currentX;
    y = currentY;
    shoot = false;

    let moves = 5;
    // difference from target
    let xDifference = difference(x, 0);
    let yDifference = difference(y, 50);

    if (xDifference < 5) {
        const { remainingMoves, move } = getMoves(moves, xDifference);
        moves = remainingMoves;
        if (x > 0) {
            x = x - move;
        } else {
            x = x + move;
        }
    } else {
        const { remainingMoves, move } = getMoves(moves, 5);
        moves = remainingMoves;
        if (x > 0) {
            x = x - move;
        } else {
            x = x + move;
        }
    }
    if (x === 0 && y === 50) {
        shoot = true;
    }

    if (yDifference < 5) {
        const { remainingMoves, move } = getMoves(moves, yDifference);
        moves = remainingMoves;

        if (y > 50) {
            y = y - move;
        } else {
            y = y + move;
        }
    } else {
        const { remainingMoves, move } = getMoves(moves, 5);
        moves = remainingMoves;

        if (y > 50) {
            y = y - move;
        } else {
            y = y + move;
        }
    }
    if (x === 0 && y === 50) {
        shoot = true;
    }


    return { x, y, shoot };
}

//exports this method
module.exports = { aim, getMoves };
