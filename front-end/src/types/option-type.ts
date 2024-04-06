import { ReactNode } from 'react';

type OptionType = {
	label: string;
	subLabel?: string;
	code: string;
	icon?: ReactNode;
	action?: () => void;
};

export type { OptionType };
