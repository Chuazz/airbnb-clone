import { CSSProperties, ReactNode } from 'react';

type OptionType<CodeType = string, ComponentType = any> = {
	code: CodeType;
	label?: string;
	subLabel?: string;
	shouldShow?: boolean;
	disable?: boolean;
	badge?: number;
	showBadge?: boolean;
	className?: string;
	component?: (_props: ComponentType) => JSX.Element;
	icon?: ReactNode;
	styles?: CSSProperties;
	divide?: boolean;
	action?: () => void;
};

export type { OptionType };
