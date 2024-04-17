import { BoxProps } from '@chakra-ui/react';
import { CSSProperties, ReactNode } from 'react';

type OptionType<CodeType = string> = {
	code: CodeType;
	label?: string;
	subLabel?: string;
	shouldShow?: boolean;
	disable?: boolean;
	badge?: number;
	showBadge?: boolean;
	icon?: ReactNode;
	className?: string;
	styles?: CSSProperties;
	boxProps?: BoxProps;
	divide?: boolean;
	action?: () => void;
};

export type { OptionType };
