function aim(currentX, currentY) {
    let x = currentX;
    let y = currentY;

    let remainingMove = 5;

    let moveX = Math.min(remainingMove, Math.abs(x));
    moveX = x < 0 ? moveX : -moveX;
    x += moveX;
    remainingMove -= Math.abs(moveX);

    let moveY = Math.min(remainingMove, Math.abs(y - 50)); 
    moveY = y > 50 ? -moveY : moveY;
    y += moveY;

    let shoot = (x === 0 && y === 50);

    return { x, y, shoot };
}

module.exports = { aim };
