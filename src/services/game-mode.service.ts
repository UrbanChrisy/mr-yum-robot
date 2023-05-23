import React, { useCallback, useMemo, useState } from "react";

export type Position = {
	x: number;
	y: number;
};

export type Direction = "NORTH" | "EAST" | "SOUTH" | "WEST";

export type GameModeContextType = {
	tableSize: number;
	setTableSize: React.Dispatch<React.SetStateAction<number>>;

	position: Position | null;
	setPosition: React.Dispatch<React.SetStateAction<Position | null>>;

	direction: Direction | null;
	setDirection: React.Dispatch<React.SetStateAction<Direction | null>>;

	execute: (commands: Command[]) => void;
};

export type Command = {
	type: "PLACE";
	x: number;
	y: number;
	direction: Direction;
} | {
	type: "MOVE";
} | {
	type: "LEFT";
} | {
	type: "RIGHT";
} | {
	type: "REPORT";
};

const GameModeContext = React.createContext<GameModeContextType>(null!);


const GameModeService = {

	Context: GameModeContext,
	Provider: GameModeContext.Provider,

	useState: () => React.useContext(GameModeContext),

	useProvidedState: (): GameModeContextType => {

		const [tableSize, setTableSize] = useState(5);
		const [position, setPosition] = useState<Position | null>(null);
		const [direction, setDirection] = useState<Direction | null>(null);

		const execute = useCallback((commands: Command[]) => {
			const newState = GameModeService.executeCommands({ initialPosition: position!, initialDirection: direction!, tableSize }, commands);
			setPosition(newState.position);
			setDirection(newState.direction);
		}, [direction, position, tableSize]);

		return useMemo(() => ({
			tableSize,
			setTableSize,

			position,
			setPosition,

			direction,
			setDirection,

			execute,
		}), [direction, execute, position, tableSize]);
	},

	executeCommands({
		initialPosition,
		initialDirection,
		tableSize,
	}: {
		initialPosition: Position | null;
		initialDirection: Direction | null;
		tableSize: number;
	}, commands: Command[]) {

		let position: Position | null = initialPosition != null ? { ...initialPosition } : null;
		let direction: Direction | null = initialDirection;

		commands.forEach((command) => {
			switch (command.type) {
				case "PLACE": {
					if (!this.isValidPosition(tableSize, command.x, command.y)) {
						break;
					}

					position = {
						x: command.x,
						y: command.y,
					};
					direction = command.direction;
					break;
				}

				case "MOVE": {
					position = this.move(tableSize, position, direction);
					break;
				}
				case "LEFT": {
					direction = this.rotateLeft(direction);
					break;
				}
				case "RIGHT": {
					direction = this.rotateRight(direction);
					break;

				}
				case "REPORT": {
					console.log("Position: ", position);
					console.log("Direction: ", direction);
					alert(`Position: ${position?.x}, ${position?.y}\nDirection: ${direction}`);
					break;
				}
				default:
					throw new Error("Invalid command");
			}
		});

		return {
			position,
			direction,
		};
	},

	isValidPosition(tableSize: number, x: number, y: number): boolean {
		return x >= 0 && x < tableSize && y >= 0 && y < tableSize;
	},

	move(tableSize: number, prevPosition: Position | null, direction: Direction | null): Position | null {

		if (prevPosition == null || direction == null) {
			return prevPosition;
		}

		let newX = prevPosition.x;
		let newY = prevPosition.y;

		switch (direction) {
			case "NORTH":
				newY = prevPosition.y + 1;
				break;
			case "EAST":
				newX = prevPosition.x + 1;
				break;
			case "SOUTH":
				newY = prevPosition.y - 1;
				break;
			case "WEST":
				newX = prevPosition.x - 1;
				break;
			default:
				throw new Error("Invalid direction");
		}

		if (!this.isValidPosition(tableSize, newX, newY)) {
			return prevPosition;
		}

		return {
			x: newX,
			y: newY,
		};
	},

	rotateLeft(direction: Direction | null): Direction | null {

		if (direction == null) {
			return direction;
		}

		switch (direction) {
			case "NORTH":
				return "WEST";
			case "WEST":
				return "SOUTH";
			case "SOUTH":
				return "EAST";
			case "EAST":
				return "NORTH";
			default:
				throw new Error("Invalid direction");
		}
	},

	rotateRight(direction: Direction | null): Direction | null {

		if (direction == null) {
			return direction;
		}

		switch (direction) {
			case "NORTH":
				return "EAST";
			case "EAST":
				return "SOUTH";
			case "SOUTH":
				return "WEST";
			case "WEST":
				return "NORTH";
			default:
				throw new Error("Invalid direction");
		}
	},

	getLabelForCommandType(command: Command) {
		switch (command.type) {
			case "PLACE":
				return `PLACE ${command.x},${command.y},${command.direction}`;
			case "MOVE":
				return "MOVE";
			case "LEFT":
				return "LEFT";
			case "RIGHT":
				return "RIGHT";
			case "REPORT":
				return "REPORT";
			default:
				throw new Error(`Unknown command: ${command}`);
		}
	},

	getColorSchemeForCommand(type: Command["type"]) {
		switch (type) {
			case "PLACE":
				return "green";
			case "MOVE":
				return "blue";
			case "LEFT":
				return "purple";
			case "RIGHT":
				return "purple";
			case "REPORT":
				return "orange";
			default:
				throw new Error(`Unknown command: ${type}`);
		}
	},

};

export default GameModeService;
