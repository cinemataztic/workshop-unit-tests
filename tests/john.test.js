const actor = require("../players/john");

describe("aim function movement limit test", () => {
    test("should not move more than 5 units", () => {
        const currentX = -99;
        const currentY = -99;
    
        const result = actor.aim(currentX, currentY);
  
        const movementX = Math.abs(result.x - currentX);
        const movementY = Math.abs(result.y - currentY);
        const totalMovement = movementX + movementY;
  
        expect(totalMovement).toBeLessThanOrEqual(5);
    });

    test("hit the target", () => {
        const currentX = -99;
        const currentY = -99;

        let result = { x: -99, y: -99, shoot: false}
        do {
            result = actor.aim(result.x, result.y);
            console.log(`x: ${result.x}, y: ${result.y}\n`);
        } while (result.shoot == false)
  
        expect(result.x).toBe(0);
        expect(result.y).toBe(50);
    });
});