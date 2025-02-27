// should move the position each round 5 or less units to the goal { x: 0, y: 50}
// starts at { -99, -99 }
// return line is added as javascript is untyped :(
function aim(currentX, currentY) {

    x = currentX;
    y = currentY;
    shoot = false;
  
    let dx = Math.max(-5, Math.min(5, -x)); // Move x closer to 0
    let dy = Math.max(-5, Math.min(5, 50 - y)); // Move y closer to 50

    x += dx;
    y += dy;
  
    if (x === 0 && y === 50) {
      shoot = true;
    }

    return { x, y, shoot }
}


//exports this method
module.exports = { aim };