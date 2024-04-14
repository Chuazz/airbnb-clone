import { iconConfig } from '@config/icon-config';
import classNames from 'classnames';
import { ReactIcon } from './react-icon';
import { ComponentPropsWithoutRef } from 'react';

interface ErrorMessageProps extends ComponentPropsWithoutRef<'div'> {
	message: string | undefined;
	icon?: keyof typeof iconConfig;
}

const ErrorMessage = ({ message, icon, ...props }: ErrorMessageProps) => {
	return (
		message && (
			<div
				{...props}
				className={classNames('flex align-items-center gap-1', props.className)}
			>
				{icon && (
					<ReactIcon
						icon={icon}
						size={16}
						color='var(--red-500)'
					/>
				)}

				<p className='flex-1 text-xs text-red-500'>{message}</p>
			</div>
		)
	);
};

export default ErrorMessage;
