'use client';

import { route } from '@config/routes';
import { appSlice } from '@redux/slices/app-slice';
import { useDispatch } from '@redux/store';
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
	const dispatch = useDispatch();

	return (
		<NextLink
			{...props}
			href={`/${lng}${route[props.href]}`}
			className={classNames('p-ripple', props.className)}
			onClick={(e) => {
				dispatch(appSlice.actions.setPage(props.href));

				props.onClick?.(e);
			}}
		>
			{props.children}

			<Ripple />
		</NextLink>
	);
};

export default Link;
