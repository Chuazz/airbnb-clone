import { ModalContext } from '@provider/modal-provider';
import { useContext } from 'react';

const useModal = () => {
	const context = useContext(ModalContext);

	return context;
};

export { useModal };
