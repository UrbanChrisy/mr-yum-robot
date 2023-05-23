import React, { FunctionComponent, useState } from "react";
import {
	Button,
	Code,
	Heading,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import GameModeService, { Command } from "../services/game-mode.service";
import CreatePlaceCommandModal, { CreatePlaceCommandFormValues } from "../modals/create-place-command.modal";

const Actions: FunctionComponent = () => {

	const { execute } = GameModeService.useState();

	const [commands, setCommands] = useState<Command[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure()

	const onPlaceClick = () => {
		onOpen();
	}

	const onHandlePlaceCommandCreate = (values: CreatePlaceCommandFormValues) => {

		console.log("onHandlePlaceCommandCreate", values);

		// setCommands((prevCommands) => [...prevCommands, { type: "PLACE", x: 0, y: 0, direction: "SOUTH" }]);
	};

	const onMoveCommandClick = () => {
		setCommands((prevCommands) => [...prevCommands, { type: "MOVE" }]);
	}

	const onTurnLeftCommandClick = () => {
		setCommands((prevCommands) => [...prevCommands, { type: "LEFT" }]);
	}

	const onTurnRightCommandClick = () => {
		setCommands((prevCommands) => [...prevCommands, { type: "RIGHT" }]);
	}
	const onReportCommandClick = () => {
		setCommands((prevCommands) => [...prevCommands, { type: "REPORT" }]);
	}

	const onExecuteClick = () => {
		execute(commands);
	}

	return (
		<>
			<VStack pt={8} pb={8}>
				<Heading size={"sm"} w={"full"} color={"green"}>Enter commands then press execute</Heading>
				<HStack minH={20} w={"full"} borderTop={"1px solid green"}  borderBottom={"1px solid green"}>
					{commands.map((command, index) => (
						<Button key={`${command.type}-${index}`} onClick={() => {}} size={"sm"} rightIcon={<CloseIcon boxSize={2}/>}>
							<Code bg={"transparent"}>{GameModeService.getLabelForCommandType(command)}</Code>
						</Button>
					))}
				</HStack>
				<HStack>
					<Button onClick={onPlaceClick} colorScheme={GameModeService.getColorSchemeForCommand("PLACE")}>PLACE</Button>
					<Button onClick={onMoveCommandClick} colorScheme={GameModeService.getColorSchemeForCommand("MOVE")}>MOVE</Button>
					<Button onClick={onTurnLeftCommandClick} colorScheme={GameModeService.getColorSchemeForCommand("LEFT")}>LEFT</Button>
					<Button onClick={onTurnRightCommandClick} colorScheme={GameModeService.getColorSchemeForCommand("RIGHT")}>RIGHT</Button>
					<Button onClick={onReportCommandClick} colorScheme={GameModeService.getColorSchemeForCommand("REPORT")}>REPORT</Button>
					<Button onClick={onExecuteClick} colorScheme={"red"}>EXECUTE</Button>
				</HStack>
			</VStack>

			<CreatePlaceCommandModal isOpen={isOpen} onClose={onClose} onCreate={onHandlePlaceCommandCreate}/>
		</>
	);
};

export default Actions;
