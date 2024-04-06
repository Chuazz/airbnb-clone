import { values } from 'lodash';

const privateRoute: { [key: string]: string } = {
	cart: '/cart',
};

const privateRoutes: string[] = values(privateRoute);

export { privateRoute, privateRoutes };
