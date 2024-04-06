import { ReactNode } from 'react';

type OptionType = {
	code: string;
	label?: string;
	subLabel?: string;
	icon?: ReactNode;
	component?: ReactNode;
	action?: () => void;
};

export type { OptionType };
