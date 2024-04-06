'use client';

import { route } from '@config/routes';
import { PageParamType } from '@type/page-type';
import { default as NextLink } from 'next/link';
import { useParams } from 'next/navigation';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { ComponentPropsWithRef, PropsWithChildren } from 'react';

type LinkProps = PropsWithChildren &
	ComponentPropsWithRef<'a'> & {
		href: keyof typeof route;
	};

const Link = (props: LinkProps) => {
	const { lng } = useParams<PageParamType>();

	return (
		<NextLink
			{...props}
			href={`/${lng}${route[props.href]}`}
			className={classNames('p-ripple', props.className)}
		>
			{props.children}

			<Ripple />
		</NextLink>
	);
};

export default Link;
