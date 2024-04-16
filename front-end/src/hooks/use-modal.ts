import { ModalContext } from '@component/modal';
import { useContext } from 'react';

const useModal = () => {
	const context = useContext(ModalContext);

	return context;
};

export { useModal };
