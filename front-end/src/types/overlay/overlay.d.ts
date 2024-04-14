import { PopoverProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type OverlayType = PopoverProps & {
	children: ReactNode;
	content: ReactNode;
};

export type { OverlayType };
