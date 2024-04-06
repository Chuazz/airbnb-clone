import { values } from 'lodash';

const pubicRoute = {
	root: '/',
	home: '/home',
};

const pubicRoutes: string[] = values(pubicRoute);

export { pubicRoute, pubicRoutes };
