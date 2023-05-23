import React, { FunctionComponent, PropsWithChildren } from "react";
import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import GameModeService from "../services/game-mode.service";

export type TabletopProps = PropsWithChildren<{}>;


const TILE_WIDTH = 80;
const Tabletop: FunctionComponent<TabletopProps> = (props) => {
	const {} = props;

	const { tableSize, direction, position  } = GameModeService.useState();
	const numOfTiles = tableSize * tableSize;

	const tiles = Array.from(Array(numOfTiles).keys());

	return (
		<Flex flexWrap="wrap" w={`${TILE_WIDTH * tableSize}px`}>
			{tiles.map((tile) => {

				const x = tile % tableSize;
				const y = tableSize - 1 - Math.floor(tile / tableSize);
				const isCurrentPosition = position?.x === x && position?.y === y;

				const onTileClick = () => {
				}

				return (
					<Flex
						key={`${x}-${y}`}
						w={`${TILE_WIDTH}px`}
						h={`${TILE_WIDTH}px`}
						borderTop={direction === "NORTH" && isCurrentPosition ? "1px solid red" : "1px solid green"}
						borderRight={direction === "EAST" && isCurrentPosition ? "1px solid red" : "1px solid green"}
						borderBottom={direction === "SOUTH" && isCurrentPosition ? "1px solid red" : "1px solid green"}
						borderLeft={direction === "WEST" && isCurrentPosition ? "1px solid red" : "1px solid green"}
						onClick={onTileClick}
						bg={isCurrentPosition ? "blue" : "black"}
						justifyContent="center"
						alignItems="center"
					>
						{/* Render the content of each tile here */}
					</Flex>
				)
			})}
		</Flex>
	);
};

export default Tabletop;
