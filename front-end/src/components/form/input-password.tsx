import { Input } from '@chakra-ui/react';
import ErrorMessage from '@component/ui/error-message';
import classNames from 'classnames';
import React from 'react';

type InputPasswordProps = {
	container?: React.HTMLAttributes<HTMLDivElement>;
	input?: HTMLInputElement & {
		label?: string;
	};
	errorMessage?: string;
};

const InputPassword = (props: InputPasswordProps) => {
	return (
		<div {...props.container}>
			{props.input?.label && (
				<label
					htmlFor={props.input?.id}
					className={classNames({ 'p-error': props?.errorMessage })}
				>
					{props.input?.label}
				</label>
			)}

			<Input
				{...props.input}
				type='password'
				className={classNames('w-full', { 'p-invalid': props.errorMessage })}
				inputClassName={classNames('border-round-3xl text-sm px-3 w-full', props.input?.cl)}
			/>

			<ErrorMessage
				message={props.errorMessage}
				className='mt-1'
				icon='lia-exclamation-circle-solid'
			/>
		</div>
	);
};

export default InputPassword;
