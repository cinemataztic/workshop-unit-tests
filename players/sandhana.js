function aim(currentX, currentY) {
    let x = currentX;
    let y = currentY;
    let shoot = false;

    let remainingX = -x;
    let remainingY = 50 - y;

    let dx = Math.max(-5, Math.min(5, remainingX));

    let remainingMovement = 5 - Math.abs(dx);

    let dy = Math.max(-remainingMovement, Math.min(remainingMovement, remainingY));

    x += dx;
    y += dy;

    if (x === 0 && y === 50) {
        shoot = true;
    }

    return { x, y, shoot };
}

module.exports = { aim };