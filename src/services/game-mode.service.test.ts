import { assert, test, describe } from "vitest";
import GameModeService, { Command, Direction, Position } from "./game-mode.service";

describe("GameModeService", () => {
	test("isValidPosition returns true for valid positions", () => {
		assert.isTrue(GameModeService.isValidPosition(5, 2, 3));
		assert.isTrue(GameModeService.isValidPosition(5, 0, 0));
		assert.isTrue(GameModeService.isValidPosition(5, 4, 4));
	});

	test("isValidPosition returns false for invalid positions", () => {
		assert.isFalse(GameModeService.isValidPosition(5, -1, 2));
		assert.isFalse(GameModeService.isValidPosition(5, 3, 6));
		assert.isFalse(GameModeService.isValidPosition(5, 5, 5));
	});

	test("rotateLeft rotates the direction correctly", () => {
		assert.equal(GameModeService.rotateLeft("NORTH"), "WEST");
		assert.equal(GameModeService.rotateLeft("WEST"), "SOUTH");
		assert.equal(GameModeService.rotateLeft("SOUTH"), "EAST");
		assert.equal(GameModeService.rotateLeft("EAST"), "NORTH");
	});

	test("rotateLeft throws an error for an invalid direction", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		assert.throw(() => GameModeService.rotateLeft("INVALID_DIRECTION"), "Invalid direction");
	});

	test("rotateRight rotates the direction correctly", () => {
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

	test("move returns the new position after moving in a valid direction", () => {
		const tableSize = 5;
		const prevPosition = { x: 2, y: 3 };
		const direction = "NORTH";

		const newPosition = GameModeService.move(tableSize, prevPosition, direction);

		assert.equal(newPosition?.x, 2);
		assert.equal(newPosition?.y, 4);

	});

	test("move returns the previous position if the direction is null", () => {
		const tableSize = 5;
		const prevPosition = { x: 2, y: 3 };
		const direction = null;

		const newPosition = GameModeService.move(tableSize, prevPosition, direction);

		assert.equal(newPosition, prevPosition);
	});

	test("move returns the previous position if it would move outside the table boundaries", () => {
		const tableSize = 5;
		const prevPosition = { x: 4, y: 4 };
		const direction = "EAST";

		const newPosition = GameModeService.move(tableSize, prevPosition, direction);

		assert.equal(newPosition, prevPosition);
	});

	test("move returns the previous position if the new position is outside the table bounds", () => {
		const tableSize = 5;
		const prevPosition = { x: 4, y: 4 };
		const direction = "NORTH";

		const newPosition = GameModeService.move(tableSize, prevPosition, direction);

		assert.equal(newPosition, prevPosition);
	});

	test("move throws an error for an invalid direction", () => {
		const tableSize = 5;
		const prevPosition = { x: 2, y: 3 };
		const direction = "INVALID_DIRECTION";

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		assert.throw(() => GameModeService.move(tableSize, prevPosition, direction), "Invalid direction");
	});

	test("executeCommands returns the final position and direction correctly", () => {
		const initialPosition: Position | null = { x: 0, y: 0 };
		const initialDirection: Direction | null = "NORTH";
		const tableSize = 5;
		const commands: Command[] = [
			{ type: "MOVE" },
			{ type: "LEFT" },
			{ type: "REPORT" },
		];

		const result = GameModeService.executeCommands({ initialPosition, initialDirection, tableSize }, commands);

		assert.equal(result.position?.x, 0);
		assert.equal(result.position?.y, 1);
		assert.equal(result.direction, "WEST");
	});

	test("executeCommands handles invalid position in PLACE command", () => {
		const initialPosition: Position | null = null;
		const initialDirection: Direction | null = null;
		const tableSize = 5;
		const commands: Command[] = [
			{ type: "PLACE", x: 6, y: 2, direction: "NORTH" },
			{ type: "REPORT" },
		];

		const result = GameModeService.executeCommands({ initialPosition, initialDirection, tableSize }, commands);

		assert.equal(result.position, null);
	});

	test("executeCommands throws an error for an invalid command", () => {
		const initialPosition: Position | null = null;
		const initialDirection: Direction | null = null;
		const tableSize = 5;
		const commands: Command[] = [
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			{ type: "INVALID_COMMAND" },
		];

		assert.throw(() => GameModeService.executeCommands({ initialPosition, initialDirection, tableSize }, commands), "Invalid command");
	});
});
