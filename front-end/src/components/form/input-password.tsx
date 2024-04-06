import ErrorMessage from '@component/ui/error-message';
import { Password, PasswordProps } from 'primereact/password';
import { classNames } from 'primereact/utils';
import React from 'react';

type InputPasswordProps = {
	container?: React.HTMLAttributes<HTMLDivElement>;
	input?: PasswordProps & {
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

			<Password
				{...props.input}
				className={classNames('w-full', { 'p-invalid': props.errorMessage })}
				inputClassName={classNames('border-round-3xl text-sm px-3 w-full', props.input?.inputClassName)}
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
