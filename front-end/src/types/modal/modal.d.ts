import { ModalProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type ModalType = Omit<ModalProps, 'isOpen' | 'onClose'> & {
	children: ReactNode;
	content: ReactNode;
};

export type { ModalType };
