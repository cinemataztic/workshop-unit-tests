// should move the position each round 5 or less units to the goal { x: 0, y: 50}
// starts at { -99, -99 }
// return line is added as javascript is untyped :(
const aim = (currentX, currentY) => {
  let x = currentX;
  let y = currentY;
  let shoot = false;

  const xAxis = 0 - x;
  const yAxis = 50 - y;

  // Calculate the manhattan distance instead of the Euclidean distance (Thanks StackOverflow)
  const distance = Math.abs(xAxis) + Math.abs(yAxis);

  // Strong horizontal wind in which a random value is computed by multipying with 3.
  const horizontalWind = Math.random() * 3;
  // Weak vertical wind in which a random value between is computed between -1 and 1.
  const verticalWind = Math.random() * 2 - 1;

  // If manhattan distance is less than 5 unit turn, then it means xAxis is in the correct range, same is the case with yAxis
  // If the manhattan distance is not less then 5 unit, then it shoudld be distributed using a method I found on internet (thanks again StackOverFlow)
  const newX = distance <= 5 ? xAxis : (5 * Math.abs(xAxis)) / distance;
  const newY = distance <= 5 ? yAxis : (5 * Math.abs(yAxis)) / distance;

  // Factor in the wind in both new x and y coordinates
  const windAffectedX = newX - horizontalWind;
  const windAffectedY = newY - verticalWind;

  // Add the current x coordinate plus wind affected x coordinate and horizontal wind to the get the new coordinate of x.
  // Add the current y coordinate plus wind affected y coordinate and vertical wind to the get the new coordinate of y.
  // Round them both to remove any decimal number.
  // For simplicity, reassign the values to x and y
  x = Math.round(x + windAffectedX + horizontalWind);
  y = Math.round(y + windAffectedY + verticalWind);

  // Set the shoot variable to true if both x and y reach their target goals.
  shoot = x === 0 && y === 50;

  return { x, y, shoot };
};

//exports this method
module.exports = { aim };
