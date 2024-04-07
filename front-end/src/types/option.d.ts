import { CSSProperties, ReactNode } from 'react';

type OptionType<CodeType = string> = {
	code: CodeType;
	label?: string;
	subLabel?: string;
	shouldShow?: boolean;
	disable?: boolean;
	badge?: number;
	showBadge?: boolean;
	className?: string;
	icon?: ReactNode;
	styles?: CSSProperties;
	divide?: boolean;
	action?: () => void;
};

export type { OptionType };
