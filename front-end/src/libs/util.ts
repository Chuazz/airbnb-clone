const beauty = (object: any) => {
	return JSON.stringify(object, null, 2);
};

const parse = (object?: any) => {
	try {
		if (object) {
			return JSON.parse(object);
		}
	} catch (error) {
		console.log('🚀 ~ parse ~ error:', error);
	}

	return object;
};

export { beauty, parse };
