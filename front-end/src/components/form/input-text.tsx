import {
	FormControl,
	FormControlProps,
	FormErrorMessage,
	FormErrorMessageProps,
	FormHelperText,
	FormHelperTextProps,
	FormLabel,
	FormLabelProps,
	Input,
	InputProps,
} from '@chakra-ui/react';

type InputTextProps = {
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

const InputText = (props: InputTextProps) => {
	return (
		<FormControl {...props.control}>
			{props.input?.label && <FormLabel {...props.label}>{props.input?.label}</FormLabel>}

			<Input {...props.input} />

			{props.input?.helpText && <FormHelperText {...props.helperText}>{props.input?.helpText}</FormHelperText>}

			{props.input?.message && <FormErrorMessage {...props.error}>{props.input.message}</FormErrorMessage>}
		</FormControl>
	);
};

export default InputText;
