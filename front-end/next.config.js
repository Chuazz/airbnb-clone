/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/en',
				permanent: true,
			},
		];
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
};

module.exports = nextConfig;
