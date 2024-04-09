/* eslint-disable @next/next/no-css-tags */
'use client';

import { ModalProvider } from '@provider/modal-provider';
import { useSelector } from '@redux/store';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PageType } from '@type/page';
import { dir } from 'i18next';
import { APIOptions, PrimeReactProvider } from 'primereact/api';
import { Bounce, toast, ToastContainer } from 'react-toastify';

import '@asset/styles/global.scss';
import { OverlayProvider } from '@provider/overlay-provider';
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

const AppLayout = ({ children, params: { lng } }: PageType) => {
	const show = useSelector((state) => state.modal.show);

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

			<body
				style={{
					overflow: show ? 'hidden' : 'auto',
				}}
			>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />

					<ModalProvider>
						<OverlayProvider>
							<PrimeReactProvider value={primeValue}>{children}</PrimeReactProvider>
						</OverlayProvider>
					</ModalProvider>
				</QueryClientProvider>

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
			</body>
		</html>
	);
};

export default AppLayout;
