import { cookieConfig } from '@config/cookie-config';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

const get = <T = string>(key: keyof typeof cookieConfig): T => {
	const value = getCookie(key);

	if (typeof value === 'string' || !value) {
		return value as T;
	}

	return JSON.parse(value);
};

const set = (key: keyof typeof cookieConfig, value: any, options?: OptionsType) => {
	setCookie(cookieConfig[key], value, options);
};

const remove = (key: keyof typeof cookieConfig, options?: OptionsType) => {
	deleteCookie(cookieConfig[key], options);
};

export const cookies = { get, set, remove };
