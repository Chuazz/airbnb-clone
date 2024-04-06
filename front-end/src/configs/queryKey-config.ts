const queryKeyConfig = {
	languages: {
		listAll: ['languages'],
		list: (query?: any) => ['list', 'languages', query],
	},
};

export { queryKeyConfig };
