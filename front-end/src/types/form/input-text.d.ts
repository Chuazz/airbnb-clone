import {
	FormControlProps,
	FormErrorMessageProps,
	FormHelperTextProps,
	FormLabelProps,
	InputProps,
} from '@chakra-ui/react';

type InputTextType = {
	control?: FormControlProps;
	label?: FormLabelProps;
	helperText?: FormHelperTextProps;
	input?: InputProps & {
		label?: string;
		helpText?: string;
		message?: string;
		onChange?: (_value: string) => void;
		onBlur?: (_value: string) => void;
	};
	error?: FormErrorMessageProps;
};

export type { InputTextType };
