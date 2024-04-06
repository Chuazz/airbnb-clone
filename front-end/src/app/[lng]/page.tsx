'use client';

import { Header } from '@component/layout/header/header';
import Link from '@component/ui/link';
import { logout } from '@lib/request';

const AppPage = () => {
	return (
		<div
			className='min-h-screen'
			style={{ padding: '0 80px' }}
		>
			<Header />

			<Link
				href='login'
				onClick={() => {
					logout();
				}}
			>
				log out
			</Link>
		</div>
	);
};

export default AppPage;
