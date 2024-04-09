import { useGetMyProfile } from '@hook/queries/use-get-my-profile';
import { useCookies } from '@hook/use-cookies';
import { Image } from './image';
import { ReactIcon } from './react-icon';

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
				width='31'
				height='31'
				imageClassName='border-circle object-cover'
			/>
		) : (
			<div
				className='surface-900 border-circle cursor-auto flex align-items-center justify-content-center'
				style={{ width: 30, height: 30 }}
			>
				<p className='text-white'>{data?.last_name?.[0]?.toUpperCase()}</p>
			</div>
		)
	) : (
		<ReactIcon
			icon='fa-user-circle'
			size={30}
		/>
	);
};

export { UserAvatar };
