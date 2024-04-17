import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { useCookies } from '@hook/use-cookies';
import { useOverlay } from '@hook/use-overlay';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { logout } from '@lib/request';
import { OptionType } from '@type/option';
import { motion } from 'framer-motion';

const UserActionOverlay = () => {
	const { getCookie } = useCookies();
	const { t } = useTranslation();
	const isLogin = getCookie<boolean>('is_login');
	const router = useRouter();
	const { onClose } = useOverlay();

	const actions: OptionType[] = [
		{
			code: 'register',
			label: t('auth:register'),
			shouldShow: !isLogin,
			boxProps: {
				fontWeight: 'medium',
				color: 'gray.900',
			},
			action() {
				onClose();
			},
		},
		{
			code: 'login',
			label: t('auth:login'),
			shouldShow: !isLogin,
			divide: true,
			action() {
				onClose();

				router.push('login');
			},
		},
		{
			code: 'messages',
			label: t('menu:messages'),
			shouldShow: isLogin,
			boxProps: {
				fontWeight: 'medium',
				color: 'gray.900',
			},
			showBadge: isLogin,
			action() {
				onClose();
			},
		},
		{
			code: 'notifications',
			label: t('menu:notifications'),
			shouldShow: isLogin,
			boxProps: {
				fontWeight: 'medium',
				color: 'gray.900',
			},
			showBadge: isLogin,
			action() {
				onClose();
			},
		},
		{
			code: 'trips',
			label: t('menu:trips'),
			shouldShow: isLogin,
			boxProps: {
				fontWeight: 'medium',
				color: 'gray.900',
			},
			action() {
				onClose();
			},
		},
		{
			code: 'wishlists',
			label: t('menu:wishlists'),
			shouldShow: isLogin,
			boxProps: {
				fontWeight: 'medium',
				color: 'gray.900',
			},
			divide: true,
			action() {
				onClose();
			},
		},
		{
			code: 'airbnb_your_home',
			label: t('menu:airbnb_your_home'),
			shouldShow: true,
			action() {
				onClose();
			},
		},
		{
			code: 'refer_a_host',
			label: t('menu:refer_a_host'),
			shouldShow: isLogin,
			action() {
				onClose();
			},
		},
		{
			code: 'account',
			label: t('menu:account'),
			shouldShow: isLogin,
			divide: true,
			action() {
				onClose();
			},
		},
		{
			code: 'gifts_card',
			label: t('menu:gifts_card'),
			shouldShow: true,
			action() {
				onClose();
			},
		},
		{
			code: 'help_center',
			label: t('menu:help_center'),
			shouldShow: true,
			action() {
				onClose();
			},
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
			width='2xs'
			maxHeight='calc(100vh - 100px)'
			align='stretch'
			boxShadow='header'
			borderRadius='xl'
			spacing={0}
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
								<Text {...action.boxProps}>{action.label}</Text>
							</Box>

							{action.divide && <Divider mt={3} />}
						</div>
					),
			)}
		</VStack>
	);
};

export { UserActionOverlay };
