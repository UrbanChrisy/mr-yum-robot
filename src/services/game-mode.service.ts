import React, { useMemo, useState } from "react";

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

		return useMemo(() => ({
			tableSize,
			setTableSize,

			position,
			setPosition,

			direction,
			setDirection
		}), [direction, position, tableSize]);
	},


	isValidPosition(tableSize: number, x: number, y: number): boolean {
		return x >= 0 && x < tableSize && y >= 0 && y < tableSize;
	},

	rotateLeft(direction: Direction): Direction {
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

	rotateRight(direction: Direction): Direction {
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
};

export default GameModeService;
