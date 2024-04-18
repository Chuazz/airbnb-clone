import { extendTheme } from '@chakra-ui/react';

const themeConfig = extendTheme({
	colors: {
		primary: {
			900: '#ff385c',
		},
		white: {
			700: '#ebebeb',
			800: '#dddddd',
			900: '#ffffff',
		},
	},
	gradients: {
		primary: 'linear-gradient(to right, #e61e4d 0%, #e31c5f 50%, #d70466 100%)',
	},
	shadows: {
		header: '0 3px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',
	},
	radii: {
		'4xl': '2rem',
		'5xl': '2.5rem',
	},
});

export { themeConfig };
