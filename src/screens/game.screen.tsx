import React, { FunctionComponent, PropsWithChildren } from "react";
import { Flex, HStack, VStack } from "@chakra-ui/react";
import GameModeService from "../services/game-mode.service";
import Actions from "../components/actions";
import Tabletop from "../components/tabletop";

export type GameScreenProps = PropsWithChildren<{}>;

const GameScreen: FunctionComponent<GameScreenProps> = (props) => {
	const {} = props;

	const {  } = GameModeService.useState();

	return (
		<VStack flex={1} bg={"black"} alignItems={"center"} justifyContent={"center"}>
			<Tabletop />
			<Actions />
		</VStack>
	);
};

export default GameScreen;
