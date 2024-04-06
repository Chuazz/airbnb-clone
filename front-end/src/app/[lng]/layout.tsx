/* eslint-disable @next/next/no-css-tags */
'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PageType } from '@type/page-type';
import { dir } from 'i18next';
import { Inter } from 'next/font/google';
import { APIOptions, PrimeReactProvider } from 'primereact/api';
import { Bounce, toast, ToastContainer } from 'react-toastify';

import '@asset/styles/global.css';
import { ModalProvider } from '@provider/modal-provider';
import { ReduxProvider } from '@root/src/providers/redux-provider';
import 'primeicons/primeicons.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '/node_modules/primeflex/primeflex.css';

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError(error) {
			toast.error(error.message);
		},
	}),
});

const primeValue: Partial<APIOptions> = { ripple: true };

const inter = Inter({ subsets: ['vietnamese', 'latin'] });

const AppLayout = ({ children, params: { lng } }: PageType) => {
	return (
		<html
			lang={lng}
			dir={dir(lng)}
			style={{ fontSize: 14 }}
		>
			<head>
				<link
					id='movie-them'
					rel='stylesheet'
					href='/themes/lara-light-indigo/theme.css'
				/>
			</head>

			<body className='m-0'>
				<main className={inter.className}>
					<ReduxProvider>
						<QueryClientProvider client={queryClient}>
							<ReactQueryDevtools initialIsOpen={false} />

							<ModalProvider>
								<PrimeReactProvider value={primeValue}>{children}</PrimeReactProvider>
							</ModalProvider>
						</QueryClientProvider>
					</ReduxProvider>

					<ToastContainer
						position='top-right'
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick={true}
						rtl={false}
						pauseOnFocusLoss={true}
						draggable={true}
						pauseOnHover={true}
						theme='light'
						transition={Bounce}
					/>
				</main>
			</body>
		</html>
	);
};

export default AppLayout;
