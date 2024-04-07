import { authRoute, authRoutes } from './auth';
import { privateRoute, privateRoutes } from './private';
import { pubicRoute } from './public';

const baseURL = 'http://localhost:3000';

const DEFAULT_LOGIN_REDIRECT = pubicRoute.root;

const route = {
	...authRoute,
	...privateRoute,
	...pubicRoute,
};

const routes = [...authRoutes, ...privateRoutes, ...privateRoutes];

export * from './private';
export * from './public';
export * from './auth';

export { DEFAULT_LOGIN_REDIRECT, routes, route, baseURL };
