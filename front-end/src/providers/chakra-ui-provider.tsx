'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { themeConfig } from '@config/theme-config';

const ChakraUIProviders = ({ children }: { children: React.ReactNode }) => {
	return <ChakraProvider theme={themeConfig}>{children}</ChakraProvider>;
};

export { ChakraUIProviders };
