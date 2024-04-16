import { ModalOverlay, Modal as ChakraModal, ModalContent, useDisclosure } from '@chakra-ui/react';
import { ModalContextType } from '@type/context/modal-context';
import { ModalType } from '@type/modal/modal';
import { createContext } from 'react';

const ModalContext = createContext<ModalContextType>({
	isOpen: false,
	onClose() {},
	onToggle() {},
	onOpen() {},
});

const Modal = ({ children, content, ...props }: ModalType) => {
	const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

	return (
		<ModalContext.Provider value={{ isOpen, onOpen, onClose, onToggle }}>
			<button onClick={onOpen}>{children}</button>

			<ChakraModal
				onClose={onClose}
				isOpen={isOpen}
				{...props}
			>
				<ModalOverlay />

				<ModalContent overflow='hidden'>{content}</ModalContent>
			</ChakraModal>
		</ModalContext.Provider>
	);
};

export { Modal, ModalContext };
