import { values } from 'lodash';

const resetPasswordCallBack = '/auth/reset-password?tab=new_password';

const authRoute = {
	'login': '/auth/login',
	'register': '/auth/register',
	'reset-password': '/auth/reset-password?tab=email',
};

const authRoutes: string[] = values(authRoute);

export { authRoute, authRoutes, resetPasswordCallBack };
