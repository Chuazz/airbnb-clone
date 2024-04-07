import { ReactNode } from 'react';

type OptionType<CodeType = string> = {
	code: CodeType;
	label?: string;
	subLabel?: string;
	icon?: ReactNode;
	component?: ReactNode;
	action?: () => void;
};

export type { OptionType };
