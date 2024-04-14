import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { InputTextType } from '@type/form/input-text';

const InputText = (props: InputTextType) => {
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
