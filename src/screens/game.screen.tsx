import React, { FunctionComponent, PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/react";
import GameModeService from "../services/game-mode.service";

export type GameScreenProps = PropsWithChildren<{}>;

const GameScreen: FunctionComponent<GameScreenProps> = (props) => {
	const {} = props;

	const { size } = GameModeService.useState();

	return (
		<Flex flex={1} bg={'pink'}>


		</Flex>
	);
};

export default GameScreen;
