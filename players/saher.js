// saher.js
function aim(currentX, currentY) {
    let x = currentX + Math.min(5, Math.abs(0 - currentX));
    let y = currentY + Math.min(5, Math.abs(50 - currentY));
    
    x += Math.floor(Math.random() * 4);
    y += Math.floor(Math.random() * 3) - 1;
    
    const shoot = x === 0 && y === 50;
    
    if (!shoot) {
        x -= 20;
        y -= 20;
    }
    
    return { x, y, shoot };
}
module.exports = { aim };
