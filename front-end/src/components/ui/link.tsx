'use client';

import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { route } from '@config/routes';
import { appSlice } from '@redux/slices/app-slice';
import { useDispatch } from '@redux/store';
import { PageParamType } from '@type/page';
import { useParams } from 'next/navigation';

type LinkProps = ChakraLinkProps & {
	href: keyof typeof route;
};

const Link = (props: LinkProps) => {
	const { lng } = useParams<PageParamType>();
	const dispatch = useDispatch();

	return (
		<ChakraLink
			{...props}
			href={`/${lng}${route[props.href]}`}
			onClick={(e) => {
				dispatch(appSlice.actions.setPage(props.href));

				props.onClick?.(e);
			}}
		>
			{props.children}
		</ChakraLink>
	);
};

export default Link;
