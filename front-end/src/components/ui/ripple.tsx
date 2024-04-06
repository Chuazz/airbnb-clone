import { Ripple as PrimeRipple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { ComponentPropsWithRef } from 'react';

type RippleProps = ComponentPropsWithRef<'div'> & {};

const Ripple = ({ children, ...props }: RippleProps) => {
	return (
		<div
			{...props}
			className={classNames('p-ripple', props.className)}
		>
			{children}

			<PrimeRipple />
		</div>
	);
};

export { Ripple };
