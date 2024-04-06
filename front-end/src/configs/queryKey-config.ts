import { collectionConfig } from './collection-config';

type QueryKeyConfigType = {
	// eslint-disable-next-line no-unused-vars
	[_key in keyof typeof collectionConfig]: { listAll: string[]; list: (_query?: any) => any[] };
};

const queryKeyConfig: QueryKeyConfigType = {
	languages: {
		listAll: ['languages'],
		list: (query?: any) => ['list', 'languages', query],
	},
	currencies: {
		listAll: ['currencies'],
		list: (query?: any) => ['list', 'currencies', query],
	},
};

export { queryKeyConfig };
