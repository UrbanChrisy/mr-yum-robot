import React, { FunctionComponent } from "react";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	ModalProps,
	Select,
	VStack,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import GameModeService, { Direction } from "../services/game-mode.service";

export type CreatePlaceCommandFormValues = {
	x: number;
	y: number;
	direction: Direction;
}

export type CreatePlaceCommandModalProps = Omit<ModalProps, "children"> & {
	onCreate: (values: CreatePlaceCommandFormValues) => void;
};

const CreatePlaceCommandModal: FunctionComponent<CreatePlaceCommandModalProps> = (props) => {
	const { onCreate, onClose, ...otherProps } = props;


	const onSubmit = (values: CreatePlaceCommandFormValues, formikHelpers: FormikHelpers<CreatePlaceCommandFormValues>) => {
		onCreate(values);
		onClose();
		formikHelpers.resetForm();
	}

	return (
		<Formik
			initialValues={{ x: 0, y: 0, direction: "NORTH" }}
			onSubmit={onSubmit}>
			{({ handleChange, handleReset, values }) => (
				<Modal {...otherProps}
					onClose={() => {
						handleReset();
						onClose();
					}}>
					<ModalOverlay />
					<ModalContent as={Form} >
						<ModalHeader>Create place command</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<VStack>
								<Input name={"x"} placeholder="X" type={"number"} onChange={handleChange} value={values.x}/>
								<Input name={"y"}  placeholder="Y" type={"number"} onChange={handleChange} value={values.y}/>
								<Select id={"direction"} placeholder="Direction" onChange={handleChange} value={values.direction}>
									<option value="NORTH">⬆️NORTH</option>
									<option value="SOUTH">⬇️SOUTH</option>
									<option value="EAST">➡️EAST</option>
									<option value="WEST">⬅️WEST</option>
								</Select>
							</VStack>
						</ModalBody>

						<ModalFooter>
							<Button
								type={"submit"}
								colorScheme={GameModeService.getColorSchemeForCommand("PLACE")}
							>PLACE</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</Formik>
	);
};

export default CreatePlaceCommandModal;
