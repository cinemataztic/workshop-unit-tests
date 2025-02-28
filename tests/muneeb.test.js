// Replace with your character team name (no .js extension)
const actor = require("../players/muneeb");

// to run tests type "npm test" from project root in terminal

describe("the design tests for the shootout character", () => {
    test("the player exists", () => {
        const currentX = -99;
        const currentY = -99;

        expect(actor).toBeDefined();
    });
    test("has the co-ordinates and trigger shoot boolean in the return type", () => {
        const currentX = -99;
        const currentY = -99;

        const result = actor.aim(currentX, currentY);

        expect(result).toHaveProperty("x");
        expect(result).toHaveProperty("y");
        expect(result).toHaveProperty("shoot");

        expect(typeof result.x).toBe("number");
        expect(typeof result.y).toBe("number");
        expect(typeof result.shoot).toBe("boolean");
    });
});

describe("the design tests for the shootout character", () => {
    test("the player exists", () => {
        const currentX = -99;
        const currentY = -99;

        expect(actor).toBeDefined();
    });
    test("has the co-ordinates and trigger shoot boolean in the return type", () => {
        const currentX = -99;
        const currentY = -99;

        const result = actor.aim(currentX, currentY);

        expect(result).toHaveProperty("x");
        expect(result).toHaveProperty("y");
        expect(result).toHaveProperty("shoot");

        expect(typeof result.x).toBe("number");
        expect(typeof result.y).toBe("number");
        expect(typeof result.shoot).toBe("boolean");
    });
});

describe("the player should shoot if x,y is 0,50", () => {

    test("hit the target", () => {
        const currentX = -99;
        const currentY = -99;
        let turns = 0;
        let result = { x: -99, y: -99, shoot: false }
        do {
            result = actor.aim(result.x, result.y);
            turns++;

            console.log(`x: ${result.x}, y: ${result.y}\n`);
        } while (result.shoot == false)
        console.log("turns", turns);
        expect(result.x).toBe(0);
        expect(result.y).toBe(50);
    });
    test("does not move more than 5 units", () => {
        const currentX = -99;
        const currentY = -99;

        const result = actor.aim(currentX, currentY);
        const movedUnits = Math.abs(currentX - result.x) + Math.abs(currentY - result.y);

        expect(movedUnits).toBeLessThanOrEqual(5);
    });

    test("should return moves left if total moves are greater", () => {
        const totalMoves = 5;
        const requiredMoves = 3;
        const { remainingMoves, move } = actor.getMoves(totalMoves, requiredMoves);
        expect(remainingMoves).toBe(2);
        expect(move).toBe(3);
    });

    test("should return moves left if total moves are less", () => {
        const totalMoves = 2;
        const requiredMoves = 5;
        const { remainingMoves, move } = actor.getMoves(totalMoves, requiredMoves);
        expect(remainingMoves).toBe(0);
        expect(move).toBe(2);
    });

    test("should return 0 moves left if total moves are 0", () => {
        const totalMoves = 0;
        const requiredMoves = 5;
        const { remainingMoves, move } = actor.getMoves(totalMoves, requiredMoves);
        expect(remainingMoves).toBe(0);
        expect(move).toBe(0);
    });

    test("should return 0 moves left if total moves are 0", () => {
        const totalMoves = 4;
        const requiredMoves = 5;
        const { remainingMoves, move } = actor.getMoves(totalMoves, requiredMoves);
        expect(remainingMoves).toBe(0);
        expect(move).toBe(4);
    });
});



/*
 * Jest Test Suite Structure:
 * 
 * describe(name, callback) - Groups related tests together.
 * test(name, callback) or it(name, callback) - Defines an individual test case.
 * 
 * Common Jest Matchers:
 * 
 * expect(value) - Starts a test assertion on a value.
 * 
 * Basic Equality:
 * expect(value).toBe(expected) - Strict equality (===).
 * expect(value).toEqual(expected) - Deep equality (for objects/arrays).
 * expect(value).not.toBe(expected) - Negates the matcher.
 * 
 * Truthiness:
 * expect(value).toBeTruthy() - Passes if value is truthy.
 * expect(value).toBeFalsy() - Passes if value is falsy.
 * expect(value).toBeNull() - Passes if value is null.
 * expect(value).toBeDefined() - Passes if value is not undefined.
 * expect(value).toBeUndefined() - Passes if value is undefined.
 * 
 * Numbers:
 * expect(value).toBeGreaterThan(number) - Checks if value is greater.
 * expect(value).toBeGreaterThanOrEqual(number) - Greater or equal.
 * expect(value).toBeLessThan(number) - Checks if value is less.
 * expect(value).toBeLessThanOrEqual(number) - Less or equal.
 * expect(value).toBeCloseTo(number, precision) - Checks floating point numbers.
 * 
 * Strings & Arrays:
 * expect(string).toMatch(regex) - Checks if string matches regex.
 * expect(array).toContain(item) - Checks if array contains an item.
 * 
 * Objects:
 * expect(object).toHaveProperty(key) - Checks if object has a property.
 * expect(object).toHaveProperty(key, value) - Checks if object has property with value.
 * 
 * Exceptions:
 * expect(fn).toThrow() - Checks if function throws an error.
 * expect(fn).toThrowError(Error) - Checks if function throws a specific error.
 * 
 * Asynchronous Testing:
 * expect(Promise).resolves.toBe(value) - Awaits resolved value.
 * expect(Promise).rejects.toThrow() - Awaits rejection and checks if it throws.
 * 
 * Mock Functions:
 * jest.fn() - Creates a mock function.
 * jest.spyOn(object, method) - Mocks a method on an object.
 * 
 * Lifecycle Hooks:
 * beforeAll(callback) - Runs once before all tests.
 * beforeEach(callback) - Runs before each test.
 * afterEach(callback) - Runs after each test.
 * afterAll(callback) - Runs once after all tests.
 */
