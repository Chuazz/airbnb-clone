import { collectionConfig } from '@config/collection-config';

const getListAPI: {
	[key in keyof typeof collectionConfig]: string;
} = {
	languages: '/items/languages',
	currencies: '/items/currencies',
	users: 'items/directus_users',
};

export { getListAPI };
