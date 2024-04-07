import { Query } from '@directus/sdk';
import queryString from 'query-string';

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

const parseDirectusQuery = (query?: Query<any, any>) => {
	if (!query) {
		return '';
	}

	const filter = JSON.stringify(query.filter);
	const alias = JSON.stringify(query.alias);
	const deep = JSON.stringify(query.deep);
	const fields = JSON.stringify(query.fields);
	const limit = JSON.stringify(query.limit);
	const offset = JSON.stringify(query.offset);
	const page = JSON.stringify(query.page);
	const search = JSON.stringify(query.search);
	const sort = JSON.stringify(query.sort);

	return queryString.stringify({ filter, alias, deep, fields, limit, offset, page, search, sort });
};

export { beauty, parse, parseDirectusQuery };
