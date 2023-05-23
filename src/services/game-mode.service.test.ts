import { assert, test, describe } from "vitest";
import GameModeService from "./game-mode.service";

// Edit an assertion and save to see HMR in action
describe("GameModeService", () => {
	test("isValidPosition returns true for valid positions", () => {
		assert.isTrue(GameModeService.isValidPosition(5, 2, 3));
		assert.isTrue(GameModeService.isValidPosition(5, 0, 0));
		assert.isTrue(GameModeService.isValidPosition(5, 4, 4));
	});

	test("GameModeService.isValidPosition returns false for invalid positions", () => {
		assert.isFalse(GameModeService.isValidPosition(5, -1, 2));
		assert.isFalse(GameModeService.isValidPosition(5, 3, 6));
		assert.isFalse(GameModeService.isValidPosition(5, 5, 5));
	});

	test("GameModeService.rotateLeft rotates the direction correctly", () => {
		assert.equal(GameModeService.rotateLeft("NORTH"), "WEST");
		assert.equal(GameModeService.rotateLeft("WEST"), "SOUTH");
		assert.equal(GameModeService.rotateLeft("SOUTH"), "EAST");
		assert.equal(GameModeService.rotateLeft("EAST"), "NORTH");
	});



	test("GameModeService.rotateLeft throws an error for an invalid direction", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		assert.throw(() => GameModeService.rotateLeft("INVALID_DIRECTION"), "Invalid direction");
	});

	test("GameModeService.rotateRight rotates the direction correctly", () => {
		assert.equal(GameModeService.rotateRight("NORTH"), "EAST");
		assert.equal(GameModeService.rotateRight("EAST"), "SOUTH");
		assert.equal(GameModeService.rotateRight("SOUTH"), "WEST");
		assert.equal(GameModeService.rotateRight("WEST"), "NORTH");
	});

	test("rotateRight throws an error for an invalid direction", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		assert.throw(() => GameModeService.rotateRight("INVALID_DIRECTION"), "Invalid direction");
	});
});
