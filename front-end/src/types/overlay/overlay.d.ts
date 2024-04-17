import { ButtonProps, PopoverProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type OverlayType = {
	children: ReactNode;
	content: ReactNode;
	buttonProps?: ButtonProps;
	popoverProps?: PopoverProps;
};

export type { OverlayType };
