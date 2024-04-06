'use client';

import Link from '@component/ui/link';
import { useCookies } from '@hook/use-cookies';
import { useModal } from '@hook/use-modal';
import { useRouter } from '@hook/use-router';
import { useTranslation } from '@hook/use-translation';
import { logout } from '@root/src/libs/request';
import { ConfirmModalType } from '@type/modal/confirm-modal-type';
import { PageType } from '@type/page-type';
import { Button } from 'primereact/button';

const AppPage = ({ params: { lng } }: PageType) => {
	const { t } = useTranslation(lng);
	const { getCookie } = useCookies();
	const isLogin = getCookie<boolean>('is_login');
	const router = useRouter();
	const { open } = useModal();

	const onLogout = () => {
		open<ConfirmModalType>({
			name: 'confirm',
			modalProps: {
				onAgree() {
					logout();

					router.push('login');
				},
			},
		});
	};

	return (
		<div className='h-screen flex align-items-center justify-content-center'>
			{isLogin && (
				<Button
					onClick={onLogout}
					label={t('auth:logout')}
				/>
			)}

			{!isLogin && (
				<Link href='login'>
					<Button label={t('auth:login')} />
				</Link>
			)}
		</div>
	);
};

export default AppPage;
