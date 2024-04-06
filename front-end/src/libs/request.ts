import { AuthenticationData, refresh } from '@directus/sdk';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import moment from 'moment';
import { client } from './directus';
import { cookies } from './cookies';

const request = axios.create({
	baseURL: process.env.NEXT_PUBLIC_DIRECTUS_PROJECT_URL,
	timeout: 5000,
	headers: {
		accept: 'application/json',
	},
});

request.interceptors.request.use(
	(config) => {
		const dayBeforeExpires = moment(parseInt(cookies.get('expires_at'))).diff(new Date(), 'day');

		if (dayBeforeExpires > 0 && dayBeforeExpires <= 10) {
			client.request(refresh('json', cookies.get('refresh_token'))).then(login);
		}

		const accessToken = cookies.get('access_token');

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

request.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

const get = (path: string, configs?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> => {
	const response = request.get(path, configs);

	return response;
};

const post = (path: string, data: any, configs?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> => {
	const response = request.post(path, data, configs);

	return response;
};

const update = (path: string, data: any, configs?: AxiosRequestConfig): Promise<AxiosResponse<any, any>> => {
	const response = request.put(path, data, configs);

	return response;
};

const remove = (path: string, configs?: AxiosRequestConfig) => {
	const response = request.delete(path, configs);

	return response;
};

const login = (data: AuthenticationData) => {
	if (!data.expires) {
		return;
	}

	const expiresAt = new Date(data.expires * 1000);

	cookies.set('access_token', data.access_token!, {
		expires: expiresAt,
	});

	cookies.set('refresh_token', data.refresh_token!, {
		expires: expiresAt,
	});

	cookies.set('expires', data.expires!.toString(), {
		expires: expiresAt,
	});

	cookies.set('expires_at', data.expires!.toString(), {
		expires: expiresAt,
	});

	cookies.set('is_login', true, {
		expires: expiresAt,
	});
};

const logout = () => {
	cookies.remove('access_token');
	cookies.remove('refresh_token');
	cookies.remove('expires');
	cookies.remove('expires_at');

	cookies.set('is_login', false);
};

const setToken = () => {
	client.setToken(cookies.get('access_token'));
};

const http = { get, post, remove, update };

export { http, request, login, logout, setToken };
