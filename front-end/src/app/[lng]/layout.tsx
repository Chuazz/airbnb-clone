'use client';

import '@asset/styles/global.scss';
import { ChakraUIProviders } from '@provider/chakra-ui-provider';
import { ModalProvider } from '@provider/modal-provider';
import { useSelector } from '@redux/store';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PageType } from '@type/page';
import { dir } from 'i18next';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Inter } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-latin',
});

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError(error) {
			toast.error(error.message);
		},
	}),
});

const AppLayout = ({ children, params: { lng } }: PageType) => {
	const show = useSelector((state) => state.modal.show);

	return (
		<html
			lang={lng}
			dir={dir(lng)}
			className={inter.variable}
		>
			<head></head>

			<body
				style={{
					overflow: show ? 'hidden' : 'auto',
				}}
			>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />

					<ModalProvider>
						<ChakraUIProviders>{children}</ChakraUIProviders>
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
