// saher.test.js
const saher = require("../players/saher");

describe("Saher Shootout Logic", () => {
    test("Player exists", () => {
        expect(saher).toBeDefined();
    });
    test("Returns coordinates and shoot boolean", () => {
        const result = saher.aim(-99, -99);
        expect(result).toHaveProperty("x");
        expect(result).toHaveProperty("y");
        expect(result).toHaveProperty("shoot");
    });
});