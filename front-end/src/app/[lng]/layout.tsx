'use client';

import '@asset/styles/global.scss';
import { ChakraUIProviders } from '@provider/chakra-ui-provider';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PageType } from '@type/page';
import { dir } from 'i18next';
import { Inter } from 'next/font/google';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import 'react-calendar/dist/Calendar.css';

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
	return (
		<html
			lang={lng}
			dir={dir(lng)}
			className={inter.className}
			style={{
				fontSize: '14px',
			}}
		>
			<head></head>

			<body>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />

					<ChakraUIProviders>{children}</ChakraUIProviders>
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
