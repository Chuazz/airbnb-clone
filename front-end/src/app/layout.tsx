import { PageType } from '@type/page-type';
import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata: Metadata = {
	title: 'Airbnb',
};

const RootLayout = ({ children }: PageType) => {
	return <CookiesProvider>{children}</CookiesProvider>;
};

export default RootLayout;
