import { useGetMyProfile } from '@hook/queries/use-get-my-profile';
import { useCookies } from '@hook/use-cookies';
import { Image } from './image';
import { ReactIcon } from './react-icon';
import { Box, Text } from '@chakra-ui/react';

const UserAvatar = () => {
	const { getCookie } = useCookies();
	const isLogin = getCookie<boolean>('is_login');

	const { data } = useGetMyProfile({
		useQueryOption: {
			enabled: !!isLogin,
		},
	});

	return isLogin ? (
		data?.avatar ? (
			<Image
				alt=''
				src='server'
				id={data?.avatar}
				width='31px'
				height='31px'
				borderRadius={9999}
				objectFit='cover'
			/>
		) : (
			<Box
				background='gray.900'
				borderRadius={9999}
				cursor='auto'
				display='flex'
				alignItems='center'
				justifyContent='center'
				width='30px'
				height='30px'
			>
				<Text color='white'>{data?.last_name?.[0]?.toUpperCase()}</Text>
			</Box>
		)
	) : (
		<ReactIcon
			icon='fa-user-circle'
			size={30}
		/>
	);
};

export { UserAvatar };
