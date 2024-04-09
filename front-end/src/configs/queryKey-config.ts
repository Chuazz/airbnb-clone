import { Query } from '@directus/sdk';

const queryKeyConfig = {
	languages: {
		listAll: ['languages'],
		list: (query?: Query<any, any>) => ['list', 'languages', query],
	},
	currencies: {
		listAll: ['currencies'],
		list: (query?: Query<any, any>) => ['list', 'currencies', query],
	},
	users: {
		me: ['my-profile'],
		list: (query?: Query<any, any>) => ['list', 'users', query],
	},
};

export { queryKeyConfig };
