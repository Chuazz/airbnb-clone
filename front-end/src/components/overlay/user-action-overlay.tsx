import { Box, Divider, VStack } from '@chakra-ui/react';
import { useCookies } from '@hook/use-cookies';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { logout } from '@lib/request';
import { OptionType } from '@type/option';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const UserActionOverlay = () => {
	const { getCookie } = useCookies();
	const { t } = useTranslation();
	const isLogin = getCookie<boolean>('is_login');
	const router = useRouter();

	const actions: OptionType[] = [
		{
			code: 'register',
			label: t('auth:register'),
			shouldShow: !isLogin,
			className: 'font-semibold text-900',
		},
		{
			code: 'login',
			label: t('auth:login'),
			shouldShow: !isLogin,
			divide: true,
			action() {
				router.push('login');
			},
		},
		{
			code: 'messages',
			label: t('menu:messages'),
			shouldShow: isLogin,
			className: 'font-semibold text-900',
			showBadge: isLogin,
		},
		{
			code: 'notifications',
			label: t('menu:notifications'),
			shouldShow: isLogin,
			className: 'font-semibold text-900',
			showBadge: isLogin,
		},
		{
			code: 'trips',
			label: t('menu:trips'),
			shouldShow: isLogin,
			className: 'font-semibold text-900',
		},
		{
			code: 'wishlists',
			label: t('menu:wishlists'),
			shouldShow: isLogin,
			className: 'font-semibold text-900',
			divide: true,
		},
		{
			code: 'airbnb_your_home',
			label: t('menu:airbnb_your_home'),
			shouldShow: true,
		},
		{
			code: 'refer_a_host',
			label: t('menu:refer_a_host'),
			shouldShow: isLogin,
		},
		{
			code: 'account',
			label: t('menu:account'),
			shouldShow: isLogin,
			divide: true,
		},
		{
			code: 'gifts_card',
			label: t('menu:gifts_card'),
			shouldShow: true,
		},
		{
			code: 'help_center',
			label: t('menu:help_center'),
			shouldShow: true,
		},
		{
			code: 'logout',
			label: t('auth:logout'),
			shouldShow: isLogin,
			action() {
				logout();

				router.push('login');
			},
		},
	];

	return (
		<VStack
			backgroundColor='white'
			py={2}
			overflow='auto'
			width={250}
			maxHeight='calc(100vh - 100px)'
			align='stretch'
		>
			{actions.map(
				(action) =>
					action.shouldShow && (
						<div
							key={action.code}
							onClick={action.action}
						>
							<Box
								as={motion.div}
								px={3}
								py={3}
								cursor='pointer'
								initial={{
									background: '#fff',
								}}
								whileHover={{
									background: 'var(--chakra-colors-gray-100)',
								}}
							>
								<p className={classNames(action.className)}>{action.label}</p>
							</Box>

							{action.divide && <Divider mt={3} />}
						</div>
					),
			)}
		</VStack>
	);
};

export { UserActionOverlay };
