import { useCookies } from '@hook/use-cookies';
import { useTranslation } from '@hook/use-translation';
import { OptionType } from '@type/option';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { motion } from 'framer-motion';
import { useRouter } from '@hook/use-router';
import { logout } from '@lib/request';
import { useOverlay } from '@hook/use-overlay';

const UserActionOverlay = () => {
	const { getCookie } = useCookies();
	const { t } = useTranslation();
	const isLogin = getCookie<boolean>('is_login');
	const router = useRouter();
	const { close } = useOverlay();

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
				close();

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
		<div
			className='flex flex-column py-2 overflow-auto'
			style={{ width: 250, maxHeight: 'calc(100vh - 100px)' }}
		>
			{actions.map(
				(action) =>
					action.shouldShow && (
						<div
							key={action.code}
							onClick={action.action}
						>
							<motion.div
								className='px-3 py-3 cursor-pointer'
								initial={{
									background: '#fff',
								}}
								whileHover={{
									background: 'var(--surface-100)',
								}}
							>
								<p className={classNames(action.className)}>{action.label}</p>
							</motion.div>

							{action.divide && <Divider className='my-2' />}
						</div>
					),
			)}
		</div>
	);
};

export { UserActionOverlay };
