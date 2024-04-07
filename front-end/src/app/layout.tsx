import { ReduxProvider } from '@provider/redux-provider';
import { PageType } from '@type/page';
import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata: Metadata = {
	title: 'Airbnb',
};

const RootLayout = ({ children }: PageType) => {
	return (
		<ReduxProvider>
			<CookiesProvider>{children}</CookiesProvider>
		</ReduxProvider>
	);
};

export default RootLayout;
