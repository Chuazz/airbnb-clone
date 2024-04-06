import ErrorMessage from '@component/ui/error-message';
import { ReactIcon } from '@component/ui/react-icon';
import { InputText as PrimeInputText, InputTextProps as PrimeInputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import React from 'react';

type InputTextProps = {
	container?: React.HTMLAttributes<HTMLDivElement>;
	label?: React.HtmlHTMLAttributes<HTMLLabelElement>;
	input?: PrimeInputTextProps & {
		label?: string;
		helpText?: string;
		onChange?: (_value: string) => void;
		onBlur?: (_value: string) => void;
	};
	errorMessage?: string;
};

const InputText = (props: InputTextProps) => {
	return (
		<div {...props.container}>
			{props.input?.label && (
				<label
					{...props.label}
					htmlFor={props.input?.id}
					className={classNames({ 'p-error': props?.errorMessage }, props.label?.className)}
				>
					{props.input?.label}
				</label>
			)}

			<PrimeInputText
				className={classNames(
					'border-round-3xl text-sm px-3 w-full',
					{
						'p-invalid': props?.errorMessage,
					},
					props.input?.className,
				)}
				onChange={(e) => props.input?.onChange?.(e.target.value)}
				onBlur={(e) => props.input?.onChange?.(e.target.value)}
				{...props.input}
			/>

			{props.input?.helpText && (
				<div className='flex align-items-center gap-1 mt-1'>
					<ReactIcon
						icon='io-ios-help-circle-outline'
						size={16}
						color='var(--surface-500)'
					/>
					<p className='text-xs flex-1 text-500'>{props.input?.helpText}</p>
				</div>
			)}

			<ErrorMessage
				message={props.errorMessage}
				className='mt-1'
				icon='lia-exclamation-circle-solid'
			/>
		</div>
	);
};

export default InputText;
