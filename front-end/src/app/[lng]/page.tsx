'use client';

import { Box } from '@chakra-ui/react';
import { Header } from '@component/layout/header/header';

const AppPage = () => {
	return (
		<div
			className='min-h-screen'
			style={{ height: 2000 }}
		>
			<Header />

			<Box mt={200}></Box>
		</div>
	);
};

export default AppPage;
